const UsersController = require("../controllers/UsersController");

const router = require(`express`).Router();

router.get(`/`, UsersController.getAll);
router.post(`/register`, UsersController.register);
router.post(`/login`, UsersController.login);
router.get(`/finduser-email`, UsersController.getUserByEmail);

module.exports = router;
