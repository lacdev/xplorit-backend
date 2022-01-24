class ApiError {
  constructor(code, message) {
    this.code = code
    this.message = message
  }

  static notModified(msg) {
    return new ApiError(304, msg)
  }

  static badRequest(msg) {
    return new ApiError(400, msg)
  }

  static unauthorized(msg) {
    return new ApiError(401, msg)
  }

  static forbidden(msg) {
    return new ApiError(403, msg)
  }

  static notFound(msg) {
    return new ApiError(404, msg)
  }

  static methodNotAllowed(msg) {
    return new ApiError(405, msg)
  }

  static proxyRequired(msg) {
    return new ApiError(407, msg)
  }

  static requestTimeout(msg) {
    return new ApiError(408, msg)
  }

  static tooManyRequests(msg) {
    return new ApiError(429, msg)
  }

  static internalError(msg) {
    return new ApiError(500, msg)
  }

  static badGateaway(msg) {
    return new ApiError(502, msg)
  }

  static serviceUnavailable(msg) {
    return new ApiError(503, msg)
  }
}

export { ApiError }
