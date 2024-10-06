import config from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.projectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage,status, userId}){
        try {
            return await this.databases.createDocument(
                config.databaseid,
                config.collectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId  
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.databaseid,
                config.collectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.databaseid,
                config.collectionid,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.databaseid,
                config.collectionid,
                slug
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async listPost(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.databaseid,
                config.collectionid,
                queries,
            )
        } catch (error) {
            // throw error;
            return false;
        }
    }
    //file upload service

    async uploadFile(file){
        try {
            console.log("Uploading file:", file);
            return await this.bucket.createFile(
                config.bucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            // throw error;
            return false;
        }
    }

    //delete the file

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                config.bucketid,
                fileID
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    FilePreview(fileID){
        return this.bucket.getFilePreview(
            config.bucketid,
            fileID
        )
    }
}

const service = new Service();
export default service;