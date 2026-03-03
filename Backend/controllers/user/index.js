
const { EditUser } = require("./editUser");
const { getallUser } = require("./getallUser");
const { loggedUser } = require("./loggedUser");
const { loginUser } = require("./loginUser");
const { ProfileUser } = require("./profile");
const { registerUser } = require("./registerUser");
const { acceptFollowRequest } = require("./RequestAssept");
const { RequestUsers } = require("./RequestUser");
const { sendRequest } = require("./sendRequest");
module.exports = { 
    registerUser,
    loginUser,
    loggedUser,
    EditUser,
    getallUser,
    ProfileUser,
    sendRequest,
    RequestUsers,
    acceptFollowRequest
};