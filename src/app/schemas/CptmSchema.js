const mongoose = require('../../config/MongoDbConfig');

const CptmSchema = new mongoose.Schema({

    situacao: [{
        _id:false,
        codigo: {
            type: Number,
            required: true
        },
        mensagem: {
            type: String,
            trim: true,
            required: true
        },
        status: {
            type: String,
            trim: true,
            required: true
        },
        linha: {
            type: String,
            trim: true,
            required: true
            
        },
        descricao: {
            type: String,
            trim: true,
            // required: true
        }
    }],
    timestamp: {
        type : Date, 
        default: Date.now 
    },


}, { collection: 'cptm' });

module.exports = mongoose.model("Cptm", CptmSchema);
