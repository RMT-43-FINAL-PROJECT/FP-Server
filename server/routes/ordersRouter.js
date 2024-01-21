const OrdersController = require("../controllers/OrdersController");
const authentication = require("../middlewares.js/authentication");
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin");

const router = require("express").Router();

router.use(authentication);

router.get(`/`, authorizationRoleAdmin, OrdersController.getAll);
router.get(`/:id`, OrdersController.getDetail);

module.exports = router;
