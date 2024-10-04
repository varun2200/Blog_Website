// import config from "../config/config.js";
// import { Client, Account,ID } from "appwrite";

// // const client = new Client()
// //     .setEndpoint(config.appwriteurl)
// //     .setProject(config.projectid)

// export class Authservice{
//     client = new Client();
//     account ;
//     constructor(){
//         this.client
//             .setEndpoint(config.appwriteurl)
//             .setProject(config.projectid);
//         this.account = new Account(this.client)
//     }
//     async createAccount({email , password, name}){
//         try{
//             const userAccount = await this.account.create(ID.unique(),email,passsword,name);
//             if(userAccount){
//                 return this.login({email,password})
//             }
//             else{
//                 return userAccount
//             }
//         }
//         catch(error){
//             throw error
//         }
//     }

//     async login({email, password}){
//         try{
//             return await this.account.createEmailPasswordSession(email,password);
//         }
//         catch(error){
//             throw error
//         }
//     }

//     async getCurrentUSer(){
//         try{
//             return await this.account.get();
//         }
//         catch(error){
//             throw error
//         }
//         return null;
//     }

//     async logout(){
//         try {
//             await this.account.deleteSessions();
//         } catch (error) {
//             throw error
//         }
//     }
// }

// const authservice = new Authservice();

// export default authservice

import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

// Authservice class to handle all user authentication methods
export class Authservice {
    client = new Client();
    account;

    constructor() {
        // Initialize Appwrite client with endpoint and project ID from config
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.projectid);
        this.account = new Account(this.client);
    }

    // Create a new account with email, password, and name
    async createAccount({ email, password, name }) {
        try {
            // Create a new user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            // If account creation is successful, log the user in
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error creating account:", error);  // Log the error for debugging
            throw error;  // Re-throw the error to be handled by the caller
        }
    }

    // Log in the user with email and password
    async login({ email, password }) {
        try {
            // Create an email/password session for the user
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Error logging in:", error);  // Log the error for debugging
            throw error;  // Re-throw the error to be handled by the caller
        }
    }

    // Get the current logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        }  catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        
        }
    }

    // Log out the current user and delete all sessions
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);  // Log the error for debugging
            throw error;  // Re-throw the error to be handled by the caller
        }
    }
}

// Export an instance of the Authservice for use across the app
const authservice = new Authservice();
export default authservice;
