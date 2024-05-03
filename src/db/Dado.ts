import mongoose from "mongoose";


const DadoSchema =  new mongoose.Schema({
    titulo:  String ,
    ano : String ,
    contexto : String,
    pontosAcesso: String,
    social: String,
    address : String,
    tipo : String
})

export const DadoModel = mongoose.model('Dado',DadoSchema);

export const getAllDado = () => DadoModel.find()
export const getDadoFromAddress = (address : string) => DadoModel.find({address})


export const createDado = (values: Record<string, any>) => new DadoModel(values).save().then((dado)=> dado.toObject());
export const deleteDado = (titulo : string) => DadoModel.findOneAndDelete({titulo : titulo})
export const updateDado = (id:string, values : Record<string, any>) => DadoModel.findByIdAndUpdate({id, values})

