import { variables } from '../config/config.js'
import { Storage } from '@google-cloud/storage'
import { v4 } from 'uuid'

const storage = new Storage({
  keyFile: process.env.GCP_SECRET,
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

        const fileHandle = bucket.file(destination) //where the file will be stored.

        await fileHandle.save(newFile)

        return fileHandle.publicUrl()
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export { uploadImages }
