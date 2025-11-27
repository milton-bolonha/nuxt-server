

set -e  # Exit on error

DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="./backups"
BACKUP_FILE="nusalegal-backup-${DATE}.sql"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"

mkdir -p ${BACKUP_DIR}

echo "🔄 Starting database backup..."

if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable not set"
    exit 1
fi

echo "📦 Creating backup: ${BACKUP_FILE}"
pg_dump $DATABASE_URL > ${BACKUP_PATH}

echo "🗜️  Compressing backup..."
gzip ${BACKUP_PATH}
BACKUP_PATH="${BACKUP_PATH}.gz"

echo "✅ Backup created: ${BACKUP_PATH}"

echo "🧹 Cleaning up old backups..."
find ${BACKUP_DIR} -name "nusalegal-backup-*.sql.gz" -mtime +7 -delete
echo "✅ Cleanup complete"

echo "🎉 Backup completed successfully!"
