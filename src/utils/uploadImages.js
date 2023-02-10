import { variables } from '../config/config.js'
import { Storage } from '@google-cloud/storage'
import { v4 } from 'uuid'

const storage = new Storage({
  // keyFile: process.env.GCP_SECRET,
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    type: process.env.GCP_TYPE,
    projectId: process.env.GCP_PROJECT_ID,
    project_id: process.env.GCP_PROJECT_ID,
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: process.env.GCP_PRIVATE_KEY,
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    auth_uri: process.env.GCP_AUTH_URI,
    token_uri: process.env.GCP_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
  },
})

const bucket = storage.bucket(variables.GCP_BUCKET) //Name of the bucket

const uniqueIdentifier = v4()

const uploadImages = async (type, files) => {
  try {
    return await Promise.all(
      files.map(async (image, index) => {
        const newFile = image

        const destination = `${type}s/${type}-id-${uniqueIdentifier}/${type}_image${
          index + 1
        }.webp` //Name of the file

        const fileHandle = bucket.file(destination) //where the files will be stored.

        await fileHandle.save(newFile)

        return fileHandle.publicUrl()
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export { uploadImages }
