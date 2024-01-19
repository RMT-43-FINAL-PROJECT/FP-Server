const UsersController = require("../controllers/UsersController")
const authentication = require("../middlewares.js/authentication")
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin")

const router = require(`express`).Router()

router.post(`/register`, UsersController.register)
router.post(`/login`, UsersController.login)

router.use(authentication)

router.get(`/`, authorizationRoleAdmin, UsersController.getAllUser)
router.put(`/:idUser`, UsersController.updateUser) // sales can update their own account
router.delete(`/:idUser`, authorizationRoleAdmin, UsersController.deleteUser)
router.get(`/finduser-email`, authorizationRoleAdmin, UsersController.getUserByEmail)
router.get(`/finduser/:idUser`, authorizationRoleAdmin, UsersController.getUserByIdParams)
router.get(`/finduser/:idUser`, authorizationRoleAdmin, UsersController.getUserByIdParams)

module.exports = router
