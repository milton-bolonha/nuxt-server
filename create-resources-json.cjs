const fs = require("fs");
const { execSync } = require("child_process");

// Lista de resources para converter
const resources = [
    "definitions",
    "files",
    "court-procedures",
    "offices",
    "vips",
];

// Criar arquivos JSON para cada resource
resources.forEach((resource) => {
    try {
        // Criar arquivo temporário com o conteúdo do seed
        const tempFile = `temp_${resource}.cjs`;
        const tempContent = `
        ${fs.readFileSync(`prisma/seeds/${resource}.ts`, "utf8")}
        console.log(JSON.stringify({ ${resource}: ${resource} }));
        `;

        fs.writeFileSync(tempFile, tempContent);

        // Executar e capturar a saída
        const jsonOutput = execSync(`node ${tempFile}`, { encoding: "utf8" });

        // Limpar arquivo temporário
        fs.unlinkSync(tempFile);

        // Criar JSON final
        const finalJSON = JSON.stringify(JSON.parse(jsonOutput), null, 2);

        fs.writeFileSync(`server/data/${resource}.json`, finalJSON);

        console.log(`✅ ${resource}.json criado com sucesso!`);
    } catch (error) {
        console.error(`❌ Erro ao criar ${resource}.json:`, error.message);
    }
});

console.log("✅ Todos os arquivos JSON de resources criados!");
