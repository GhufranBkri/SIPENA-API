const fs = require('fs');
const path = require('path');

// Dapatkan nama model dari command line
const modelName = process.argv[2];

if (!modelName) {
    console.log('Tolong berikan nama model!');
    process.exit(1);
}

// Folder template yang ingin diduplikasi
const templateDir = path.join(__dirname, '../crud-template'); // Sesuaikan dengan lokasi yang benar
const outputDir = path.join(__dirname, modelName.toLowerCase());

// Pastikan direktori output belum ada sebelum membuat
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
} else {
    console.log(`Folder ${outputDir} sudah ada. Menggunakan folder yang ada.`);
}

// Fungsi untuk menggantikan placeholder dalam template
const replacePlaceholders = (content, name) => {
    const capitalizedModelName = name.charAt(0).toUpperCase() + name.slice(1);
    return content.replace(/ModelName/g, capitalizedModelName).replace(/modelName/g, name);
};

// Copy semua file dari template ke output directory
const copyFiles = (src, dest, name) => {
    if (!fs.existsSync(src)) {
        console.error(`Direktori template tidak ditemukan: ${src}`);
        process.exit(1);
    }

    const files = fs.readdirSync(src);
    files.forEach(file => {
        const srcFilePath = path.join(src, file);
        const content = fs.readFileSync(srcFilePath, 'utf-8');
        const newContent = replacePlaceholders(content, name);
        const newFileName = file.replace('ModelName', name.charAt(0).toUpperCase() + name.slice(1))
        fs.writeFileSync(path.join(dest, newFileName), newContent);
    });
};

// Generate folder dan file
copyFiles(templateDir, outputDir, modelName);
console.log(`CRUD untuk ${modelName} berhasil digenerate di folder ${outputDir}`);