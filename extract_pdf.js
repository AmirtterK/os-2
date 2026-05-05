const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    for (const file of process.argv.slice(2)) {
        console.log(`\n\n--- Content of ${file} ---`);
        let dataBuffer = fs.readFileSync(file);
        try {
            const data = await pdf(dataBuffer);
            console.log(data.text);
        } catch (e) {
            console.error(`Error reading ${file}:`, e.message);
        }
    }0
}
extract();
