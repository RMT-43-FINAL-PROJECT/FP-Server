const OrdersController = require("../controllers/OrdersController");

const router = require("express").Router();

router.get(`/`, OrdersController.getAll);

module.exports = router;
