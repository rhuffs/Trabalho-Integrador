const multer = require("multer");
const path = require("path");
const fs = require("fs");

const pasta = path.join(__dirname, "../../uploads/odontogramas");

fs.mkdirSync(pasta, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pasta);
    },

    filename: (req, file, cb) => {
        const extensao = path.extname(file.originalname).toLowerCase();
        const nomeArquivo = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extensao}`;

        cb(null, nomeArquivo);
    }
});

const fileFilter = (req, file, cb) => {
    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "application/pdf"
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Formato de arquivo não permitido."));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

module.exports = upload;