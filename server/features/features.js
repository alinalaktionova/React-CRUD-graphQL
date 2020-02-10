const {CREATE, DELETE, EDIT} = require("./featureConstants");

const adminFeatures = [CREATE, EDIT, DELETE];
const userFeatures = [EDIT];

module.exports = { adminFeatures, userFeatures};