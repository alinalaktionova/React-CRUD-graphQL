const checkPermission = (user, claim) =>
  !!(user && user.features.includes(claim));
module.exports = checkPermission;
