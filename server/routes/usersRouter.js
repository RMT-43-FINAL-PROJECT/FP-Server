const UsersController = require("../controllers/UsersController")
const authentication = require("../middlewares.js/authentication")
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin")

const router = require(`express`).Router()

router.get(`/`, authentication, authorizationRoleAdmin, UsersController.getAllUser)
router.post(`/register`, UsersController.register)
router.post(`/login`, UsersController.login)
router.get(`/finduser-email`, UsersController.getUserByEmail)

module.exports = router
