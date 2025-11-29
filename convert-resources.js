const fs = require('fs');
const { execSync } = require('child_process');

const resources = ['definitions', 'files', 'court-procedures', 'offices', 'vips'];

resources.forEach(resource => {
    try {
        const tempFile = `temp_${resource}.cjs`;
        const tempContent = `
        ${fs.readFileSync(`prisma/seeds/${resource}.ts`, 'utf8')}
        console.log(JSON.stringify({ ${resource}: ${resource} }));
        `;

        fs.writeFileSync(tempFile, tempContent);
        const jsonOutput = execSync(`node ${tempFile}`, { encoding: 'utf8' });
        fs.unlinkSync(tempFile);

        const finalJSON = JSON.stringify(JSON.parse(jsonOutput), null, 2);
        fs.writeFileSync(`server/data/${resource}.json`, finalJSON);

        console.log(`✅ ${resource}.json criado com sucesso!`);
    } catch (error) {
        console.error(`❌ Erro ao criar ${resource}.json:`, error.message);
    }
});

console.log('✅ Todos os arquivos JSON de resources criados!');
