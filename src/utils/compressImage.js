import sharp from 'sharp'

const compressImage = async (file) => {
  try {
    return await sharp(file).webp({ quality: 50 }).toBuffer()
  } catch (e) {
    console.error(e)
  }
}

export { compressImage }
