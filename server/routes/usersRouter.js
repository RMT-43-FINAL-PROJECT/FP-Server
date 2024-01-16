const UsersController = require("../controllers/UsersController");

const router = require(`express`).Router();

router.get(`/`, UsersController.getAll);

module.exports = router;
