const ProductsController = require("../controllers/ProductsController");

const router = require(`express`).Router();

router.get(`/`, ProductsController.getAll);

module.exports = router;
