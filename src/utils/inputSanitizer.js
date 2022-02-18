import sanitizeHtml from 'sanitize-html'

const sanitizeInput = (string) => {
  return sanitizeHtml(string, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['br']),
    allowedSchemes: sanitizeHtml.defaults.allowedSchemes.concat(['https']),
  })
}

export { sanitizeInput }
