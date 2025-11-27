# Database Backup Script for nUSA Legal (Windows PowerShell)
# Backs up PostgreSQL database

param(
    [string]$OutputDir = ".\backups"
)

$ErrorActionPreference = "Stop"

# Configuration
$Date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BackupFile = "nusalegal-backup-$Date.sql"
$BackupPath = Join-Path $OutputDir $BackupFile

# Create backup directory if it doesn't exist
if (!(Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

Write-Host "🔄 Starting database backup..." -ForegroundColor Cyan

# Check if DATABASE_URL is set
if (-not $env:DATABASE_URL) {
    Write-Host "❌ ERROR: DATABASE_URL environment variable not set" -ForegroundColor Red
    exit 1
}

# Parse DATABASE_URL (basic parsing for PostgreSQL)
$dbUrl = $env:DATABASE_URL

# For SQLite (local development)
if ($dbUrl -match "^file:(.+)$") {
    $sqlitePath = $Matches[1].Replace("./", "")
    $sqliteFullPath = Join-Path $PSScriptRoot ".." $sqlitePath
    
    Write-Host "📦 Backing up SQLite database..." -ForegroundColor Yellow
    Copy-Item -Path $sqliteFullPath -Destination "$BackupPath.db" -Force
    
    # Compress
    Write-Host "🗜️  Compressing backup..." -ForegroundColor Yellow
    Compress-Archive -Path "$BackupPath.db" -DestinationPath "$BackupPath.zip" -Force
    Remove-Item "$BackupPath.db"
    
    Write-Host "✅ Backup created: $BackupPath.zip" -ForegroundColor Green
    $BackupPath = "$BackupPath.zip"
}
# For PostgreSQL (production)
elseif ($dbUrl -match "^postgresql://") {
    Write-Host "📦 Creating PostgreSQL backup..." -ForegroundColor Yellow
    
    # Use pg_dump (requires PostgreSQL tools installed)
    $pgDumpPath = Get-Command pg_dump -ErrorAction SilentlyContinue
    
    if (-not $pgDumpPath) {
        Write-Host "❌ ERROR: pg_dump not found. Please install PostgreSQL tools." -ForegroundColor Red
        exit 1
    }
    
    & pg_dump $env:DATABASE_URL > $BackupPath
    
    # Compress
    Write-Host "🗜️  Compressing backup..." -ForegroundColor Yellow
    Compress-Archive -Path $BackupPath -DestinationPath "$BackupPath.zip" -Force
    Remove-Item $BackupPath
    
    Write-Host "✅ Backup created: $BackupPath.zip" -ForegroundColor Green
    $BackupPath = "$BackupPath.zip"
}
else {
    Write-Host "❌ ERROR: Unsupported DATABASE_URL format" -ForegroundColor Red
    exit 1
}

# Cleanup old backups (keep last 7 days)
Write-Host "🧹 Cleaning up old backups..." -ForegroundColor Yellow
$CutoffDate = (Get-Date).AddDays(-7)
Get-ChildItem -Path $OutputDir -Filter "nusalegal-backup-*" | 
    Where-Object { $_.LastWriteTime -lt $CutoffDate } | 
    Remove-Item -Force

Write-Host "✅ Cleanup complete" -ForegroundColor Green
Write-Host "🎉 Backup completed successfully!" -ForegroundColor Green
