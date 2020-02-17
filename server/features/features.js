const {CREATE, DELETE, EDIT} = require("./featureOperations");

const adminFeatures = [CREATE, EDIT, DELETE];
const userFeatures = [EDIT];

module.exports = { adminFeatures, userFeatures};