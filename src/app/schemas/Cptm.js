const mongoose = require('../../config/MongoDbConfig');

const CptmSchema = new mongoose.Schema({
    linha: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true
    },
    mensagem: {
        type: String,
        trim: true,
        required: true
    },
    codigo: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        trim: true,
        required: true
    }
}, { collection: 'cptm' });

module.exports = mongoose.model("Cptm", CptmSchema);
