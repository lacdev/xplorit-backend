import { variables } from '../config/config.js'
import { Storage } from '@google-cloud/storage'
import { v4 } from 'uuid'

const storage = new Storage({
  keyFile: process.env.GCP_SECRET,
})

const bucket = storage.bucket(variables.GCP_BUCKET)

const uploadImage = async (id, file) => {
  try {
    const uniqueIdentifier = v4()
    const newFile = file
    const destination = `users/${id}/${uniqueIdentifier}-cover.webp` //Name of the file
    const fileHandle = bucket.file(destination) //where the file will be stored.
    await fileHandle.save(newFile)
    return fileHandle.publicUrl()
  } catch (e) {
    console.error(e)
  }
}

export { uploadImage }
