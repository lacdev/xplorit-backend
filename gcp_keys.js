import { variables } from './src/config/config.js'

const GCP_KEYS = {
  type: variables.GCP_TYPE,
  project_id: variables.GCP_PROJECT_ID,
  private_key_id: variables.GCP_PRIVATE_KEY_ID,
  private_key: variables.GCP_PRIVATE_KEY,
  client_email: variables.GCP_CLIENT_EMAIL,
  client_id: variables.GCP_CLIENT_ID,
  auth_uri: variables.GCP_AUTH_URI,
  token_uri: variables.GCP_TOKEN_URI,
  auth_provider_x509_cert_url: variables.GCP_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: variables.GCP_CLIENT_X509_CERT_URL,
}

export default GCP_KEYS
