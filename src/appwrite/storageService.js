import config from '../config/config.js'
import { Client, ID, Storage, Query } from "appwrite";

export class StorageService {
    client = new Client()
    storage

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.storage = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await storage.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            throw error;
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await storage.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId: fileId
            });
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            throw error;
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview({
                bucketId: config.appwriteBucketId,
                fileId: fileId
            });
        }catch(error){
            console.log("Appwrite serive :: getFilePreview :: error", error);
            throw error;
        }
    }
}

export const storageService = new StorageService()