import mongoose from "mongoose";

const ArquivoSchema = new mongoose.Schema({
    address : {type: String, required:true},
    tipo: {type:String, required:true}
})

export const ArquivoModel = mongoose.model('Arquivo',ArquivoSchema);

export const createArquivo = (values: Record<string, any>) => new ArquivoModel(values).save().then((arquivo)=> arquivo.toObject());

export const getArquivo  = (tipo : string) => ArquivoModel.findOne({tipo})