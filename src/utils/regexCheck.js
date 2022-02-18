import safeRegex from 'safe-regex'

const isSafeRegex = (regex) => safeRegex(regex)

export { isSafeRegex }
