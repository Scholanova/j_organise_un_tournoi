class RessourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}

module.exports = {
  RessourceNotFoundError
}
