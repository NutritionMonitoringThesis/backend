import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    projectId: 'stunted-project',
    keyFilename: './src/secret/stunted-project-ccd15a48d57a.json'
})

export const bucket = storage.bucket('stunted-bucket')