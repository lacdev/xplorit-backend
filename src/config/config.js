import dotenv from 'dotenv'
dotenv.config()

const variables = {
  GCP_BUCKET: process.env.GCP_STORAGE_BUCKET_NAME,
  PORT: process.env.PORT || 8080 || 9090,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  GCP_TYPE: process.env.GCP_TYPE,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  GCP_PRIVATE_KEY_ID: process.env.GCP_PRIVATE_KEY_ID,
  GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY,
  GCP_CLIENT_EMAIL: process.env.GCP_CLIENT_EMAIL,
  GCP_CLIENT_ID: process.env.GCP_CLIENT_ID,
  GCP_AUTH_URI: process.env.GCP_AUTH_URI,
  GCP_TOKEN_URI: process.env.GCP_TOKEN_URI,
  GCP_AUTH_PROVIDER_X509_CERT_URL: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL: process.env.GCP_CLIENT_X509_CERT_URL,
}

export { variables }
