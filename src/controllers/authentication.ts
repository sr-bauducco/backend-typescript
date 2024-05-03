import express from 'express';

import { createUser, getUserFromEmail } from 'C:/Users/israe/Documents/api/src/db/User';
import { authentication, random } from 'C:/Users/israe/Documents/api/src/helpers/index';



export const login = async (req = express.request, res = express.response) =>{
    try {
        const {email,password} = req.body;

        if (!email || !password ){
            return res.sendStatus(404)
        }
        
        const user = await getUserFromEmail(email).select('+authentication.salt +authetication.password')

        if(!user){
            return res.sendStatus(404)
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password !== expectedHash){
            const salt = random();
            user.authentication.sessionToken = authentication(salt,user._id.toString())
        
            await user.save()

            res.cookie('hackathon-api-auth',user.authentication.sessionToken, {domain: "localhost", path : '/ '})
        }else{
            return res.sendStatus(403)
        }

        
        return res.status(200).json(user).end();
    } catch (error) {
        
    }
}

export const register = async (req = express.request, res = express.response) =>{
    try{    
        const {email, password,username} =  req.body;

        if (!email || !password || !username){
            return res.sendStatus(404), "user not found"
        }
        const existingUser = await getUserFromEmail(email);

        if(existingUser){
            return res.sendStatus(400)
        } 

        const salt = random(); 
        const user = await createUser({
            email,
            username,
            authentication:{
                password : authentication(salt,password),
                salt,
            }
        })
        return res.status(200).json(user).end();

    } catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}