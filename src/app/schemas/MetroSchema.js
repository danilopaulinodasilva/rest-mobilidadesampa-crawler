const mongoose = require('mongoose');

const MetroSchema = new mongoose.Schema({

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


}, { collection: 'metro' });

module.exports = mongoose.model("Metro", MetroSchema);
