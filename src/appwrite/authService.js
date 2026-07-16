import config from '../config/config.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client()
    account
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email,password,username}){
        try{
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                username
            })
            if(userAccount){
                // if user successfuly created account then directly log in him/her
                return this.login({email,password})
            }else{
                return userAccount;
            }
        }catch(error){
            console.log("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({email , password}){
        try{
            return await this.account.createEmailPasswordSession({
                email,password
            })
        }catch(error){
            console.log("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            const user =  await this.account.get();
            if(user){
                return user;
            }else{
                return null;
            }
        }catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
            throw error;
        }
    }


    async logout(){
        try{
            return await this.account.deleteSessions()
        }catch(error){
            console.log("Appwrite service :: logout :: error", error);
            throw error;
        }
    }
}

export const authService = new AuthService()