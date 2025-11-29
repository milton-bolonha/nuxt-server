const fs = require("fs");
let data = fs.readFileSync("server/data/federal-rules-frcp.json", "utf8");

// Substituir export const por objeto JSON
data = data.replace(/export const frcpRules = /, '{"frcpRules": ');

// Converter aspas simples para duplas
data = data.replace(/'/g, '"');

// Converter propriedades JavaScript para JSON
data = data.replace(/(\w+):/g, '"$1":');

// Fechar o objeto JSON
data = data.replace(/]$/, "]}");

fs.writeFileSync("server/data/federal-rules-frcp.json", data);
console.log("Arquivo convertido com sucesso");
