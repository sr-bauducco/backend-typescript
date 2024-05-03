import { createNewArquivo, createNewDado, getNewArquivo, getNewDado } from "../controllers/dado";
import {register, login} from "../controllers/authentication";
import express from "express";


export default (router : express.Router)=>{
    router.post('/auth/register',register),
    router.post('/auth/login',login)
    router.post('/arquivo/create',createNewArquivo)
    router.post('/dado/create',createNewDado)
    router.get('/dado/get',getNewDado)
    router.get('/arquivo/get',getNewArquivo)
}