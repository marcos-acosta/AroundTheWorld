module.exports = sessionizeUser = user => {
  return { userId: user.id, email: user.email };
}