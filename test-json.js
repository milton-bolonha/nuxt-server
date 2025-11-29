const fs = require('fs');

const files = ['definitions', 'files', 'court-procedures', 'offices', 'vips'];

files.forEach(file => {
    try {
        const data = JSON.parse(fs.readFileSync(`server/data/${file}.json`, 'utf8'));
        console.log(`✅ ${file}.json - Válido`);
    } catch (error) {
        console.log(`❌ ${file}.json - Inválido: ${error.message}`);
    }
});
