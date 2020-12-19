const mongoose = require('../../config/MongoDbConfig');

const CptmSchema = new mongoose.Schema({
    linha: {
        type: String,
        trim: true,
        required: [true, `A "linha" is required.`]
    },
    status: {
        type: String,
        trim: true,
        required: [true, `A "status" is required.`]
    },
    mensagem: {
        type: String,
        trim: true,
        required: [true, `A "mensagem" is required.`]
    },
    codigo: {
        type: Number,
        required: [true, `A "codigo" is required.`]
    },
    descricao: {
        type: String,
        trim: true,
        required: [true, `A "descricao" is required.`]
    }
}, { collection: 'cptm' });

module.exports = mongoose.model("Cptm", CptmSchema);
