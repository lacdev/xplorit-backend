import sharp from 'sharp'

const compressImages = async (files) => {
  try {
    return await Promise.all(
      files.map(
        async (file) =>
          await sharp(file.buffer).webp({ quality: 50 }).toBuffer()
      )
    )
  } catch (e) {
    console.error(e)
  }
}

export { compressImages }
