import express from 'express';

import { createDado, getDadoFromAddress } from 'C:/Users/israe/Documents/api/src/db/Dado';
import { createArquivo, getArquivo } from 'C:/Users/israe/Documents/api/src/db/Arquivo';


export const createNewDado = async (req = express.request, res = express.response) =>{
    try {
        const {titulo,ano,contexto,pontoAcesso,social,address,tipo} = req.body;

        if (pontoAcesso || titulo || contexto){
            const dado = await createDado({
                titulo,
                ano,
                contexto,
                pontoAcesso,
                social,
                address,
                tipo  
            })
            return res.status(200).json(dado).end();
        }

        return res.sendStatus(418)
        
    } catch (error) {
        return res.sendStatus(400);
    }
}
export const createNewArquivo = async (req = express.request, res = express.response) =>{
    try {
        const {address,tipo} = req.body;

        if (!address || !tipo){
            return res.sendStatus(418)
        }

        const dado = await createArquivo({
                address,
                tipo
        })
        return res.status(200).json(dado).end();
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const getNewArquivo = async (req = express.request, res = express.response) =>{
    try {
        const {tipo} = req.body;

        if (!tipo){
            return res.sendStatus(418)
        }

        const arquivo = await getArquivo(tipo)
        
        return res.status(200).json(arquivo).end();
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const getNewDado = async (req = express.request, res = express.response) =>{
    try {
        const {titulo,data,contexto,pontoAcesso,social,
            address,tipo} = req.body;

        if (!address){
            return res.sendStatus(418)
        }

        const arquivo = await getDadoFromAddress(address)
        
        return res.status(200).json(arquivo).end();
    } catch (error) {
        return res.sendStatus(400);
    }
}




