class RessourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}

class TotalParticipantDifferentFromNbParticipant extends Error {
  constructor (value) {
    super(value)
  }
}

module.exports = {
  RessourceNotFoundError,
  TotalParticipantDifferentFromNbParticipant
}
