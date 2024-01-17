const UsersController = require("../controllers/UsersController");
const authentication = require("../middlewares.js/authentication");

const router = require(`express`).Router();

router.get(`/`, authentication, UsersController.getAllUser);
router.post(`/register`, UsersController.register);
router.post(`/login`, UsersController.login);
router.get(`/finduser-email`, UsersController.getUserByEmail);

module.exports = router;
