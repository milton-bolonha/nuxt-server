const fs = require('fs');
let data = fs.readFileSync('server/data/federal-rules-frcp.json', 'utf8');

// Substituir export const por objeto JSON
data = data.replace(/export const frcpRules = /, '{\"frcpRules\": ');

// Converter aspas simples para duplas
data = data.replace(/'/g, '\"');

// Converter propriedades JavaScript para JSON
data = data.replace(/(\w+):/g, '\"$1\":');

// Escapar aspas duplas dentro de strings (exceto as estruturais)
data = data.replace(/"description": "([^"]*)(")([^"]*)"([^"]*)"([^"]*)"/g, (match, before, quote1, middle, quote2, after) => {
  return `"description": "${before}\\"${middle}\\"${after}"`;
});

// Fechar o objeto JSON
data = data.replace(/]$/, ']}');

fs.writeFileSync('server/data/federal-rules-frcp.json', data);
console.log('Arquivo federal-rules-frcp.json convertido com sucesso');
