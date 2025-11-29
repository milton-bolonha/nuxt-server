const fs = require("fs");
const data = fs.readFileSync("server/data/federal-rules-frcp.json", "utf8");
try {
    JSON.parse(data);
    console.log("✅ JSON válido");
} catch (e) {
    const lines = data.split("\n");
    const charPos = parseInt(e.message.match(/position (\d+)/)[1]);
    let lineNum = 0;
    let charCount = 0;
    for (let i = 0; i < lines.length; i++) {
        if (charCount + lines[i].length >= charPos) {
            lineNum = i + 1;
            break;
        }
        charCount += lines[i].length + 1; // +1 for newline
    }
    console.log("❌ Erro na linha", lineNum, ":", e.message);
    console.log("Linha problemática:", lines[lineNum - 1]);
}
