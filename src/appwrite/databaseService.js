import config from '../config/config.js'
import { Client, Databases, Query } from "appwrite";

export class DatabaseService {
    client = new Client()
    databases

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        const databases = new Databases(this.clint)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: appwriteCollectionId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: appwriteCollectionId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: appwriteCollectionId,
                documentId: slug
            })
            return true;
        }catch(error){
            console.log("Appwrite serive :: deletePost :: error", error);
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: appwriteCollectionId,
                documentId: slug
            })
        }catch(error){
            console.log("Appwrite serive :: getPost :: error", error);
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status' , 'active')]){
        try{
            return await this.databases.listDocuments({
                databaseId: config.appwriteDatabaseId,
                collectionId: appwriteCollectionId,
                queries
            })
        }catch(error){
            console.log("Appwrite serive :: getPosts :: error", error);
            throw error;
            return false;
        }
    }
}

export const datsbaseService = new DatabaseService()