#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const sourceDir = path.join(__dirname, '..')
const targetDir = path.join(__dirname, 'server', 'bills')
const oldTargetDir = path.join(__dirname, 'api', 'bills')

const sourceFolders = [
  'dcbills',
  'constitution',
  'bills',
  'eos',
  'gmdirective',
  'misc',
  'parties',
  'scotus'
]

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✓ Created directory: ${dirPath}`)
  }
}

function deleteExistingPDFs(dirPath, dirLabel = 'directory') {
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 ${dirLabel} does not exist`)
    return 0
  }
  
  const files = fs.readdirSync(dirPath)
  let deletedCount = 0
  
  for (const file of files) {
    if (file.toLowerCase().endsWith('.pdf')) {
      const filePath = path.join(dirPath, file)
      fs.unlinkSync(filePath)
      console.log(`🗑️  Deleted: ${file}`)
      deletedCount++
    }
  }
  
  return deletedCount
}

function extractBillNumber(filename) {
  const name = filename.replace(/\.pdf$/i, '').toLowerCase()
  
  const patterns = [
    /\b(hr|hrj|hb|sb|hcr|scr|hjr|sjr)\s*(\d+)/i,
    /\b(h\.r\.|s\.)\s*(\d+)/i,
    /\b(house|senate)\s+(bill|resolution|joint)\s+(\d+)/i
  ]
  
  for (const pattern of patterns) {
    const match = name.match(pattern)
    if (match) {
      if (match[3]) {
        const type = match[1].toLowerCase().replace(/\s+/g, '')
        return `${type}${match[3]}`
      } else {
        const type = match[1].toLowerCase().replace(/\.|_|-|\s+/g, '')
        return `${type}${match[2]}`
      }
    }
  }
  
  return null
}

function sanitizeFilename(filename) {
  return filename
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase()
}

function getBillTitle(filename) {
  const name = filename.replace(/\.pdf$/i, '')
  
  const patterns = [
    /^(.*?)\s*-\s*(hr|hb|sb|bill)/i,
    /^(.*?)\s+(act|bill|resolution)/i,
    /(.*?)\s+\d{4}/,
    /^([^(]+)\s*\(/
  ]
  
  for (const pattern of patterns) {
    const match = name.match(pattern)
    if (match && match[1]) {
      return sanitizeFilename(match[1].trim())
    }
  }
  
  return sanitizeFilename(name)
}

function copyPDFs(sourceFolder, renameFunction = null) {
  const sourcePath = path.join(sourceDir, sourceFolder)
  const destPath = path.join(targetDir, sourceFolder)
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️  Folder not found: ${sourceFolder}`)
    return 0
  }
  
  ensureDirectoryExists(destPath)
  
  const files = fs.readdirSync(sourcePath)
  let copiedCount = 0
  
  for (const file of files) {
    if (file.toLowerCase().endsWith('.pdf')) {
      const sourceFile = path.join(sourcePath, file)
      let newFilename = file
      
      if (renameFunction) {
        const renamed = renameFunction(file)
        if (renamed) {
          newFilename = renamed + '.pdf'
        }
      }
      
      const targetFile = path.join(destPath, newFilename)
      
      if (fs.existsSync(targetFile)) {
        const timestamp = Date.now()
        const baseName = newFilename.replace(/\.pdf$/i, '')
        newFilename = `${baseName}_${timestamp}.pdf`
      }
      
      fs.copyFileSync(sourceFile, path.join(destPath, newFilename))
      
      if (renameFunction && newFilename !== file) {
        console.log(`✓ Copied & Renamed: ${file} → ${newFilename}`)
      } else {
        console.log(`✓ Copied: ${file}`)
      }
      
      copiedCount++
    }
  }
  
  return copiedCount
}

function deleteDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return 0
  }
  
  let deletedCount = 0
  const items = fs.readdirSync(dirPath)
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item)
    const stat = fs.statSync(itemPath)
    
    if (stat.isDirectory()) {
      deletedCount += deleteDirectory(itemPath)
      fs.rmdirSync(itemPath)
    } else if (item.toLowerCase().endsWith('.pdf')) {
      fs.unlinkSync(itemPath)
      deletedCount++
    }
  }
  
  return deletedCount
}

function main() {
  console.log('📚 Starting PDF organization...\n')
  
  console.log('🗑️  Step 1: Cleaning up old locations...')
  
  if (fs.existsSync(oldTargetDir)) {
    console.log('   Removing old api/bills directory...')
    const oldDeleted = deleteDirectory(oldTargetDir)
    console.log(`   Deleted ${oldDeleted} PDF(s) from api/bills`)
  }
  
  if (fs.existsSync(targetDir)) {
    console.log('   Removing old server/bills directory...')
    const deletedCount = deleteDirectory(targetDir)
    fs.rmdirSync(targetDir)
    console.log(`   Deleted ${deletedCount} PDF(s) from server/bills`)
  }
  
  ensureDirectoryExists(targetDir)
  
  console.log('\n📁 Step 2: Organizing PDFs into subfolders...\n')
  let totalCopied = 0
  
  for (const folder of sourceFolders) {
    console.log(`\n📂 Processing folder: ${folder}`)
    console.log(`   → Destination: server/bills/${folder}/`)
    
    let renameFunction = null
    
    if (folder === 'bills') {
      renameFunction = extractBillNumber
      console.log('   → Using bill number extraction (hr1, hrj5, etc.)')
    } else if (folder === 'dcbills') {
      renameFunction = getBillTitle
      console.log('   → Using bill title extraction')
    }
    
    const count = copyPDFs(folder, renameFunction)
    totalCopied += count
    console.log(`   ✓ Copied ${count} file(s)`)
  }
  
  console.log(`\n✅ Done! Total PDFs organized: ${totalCopied}`)
  console.log(`📍 Location: ${targetDir}`)
  console.log(`\n📂 Folder structure:`)
  for (const folder of sourceFolders) {
    console.log(`   - server/bills/${folder}/`)
  }
}

main()
