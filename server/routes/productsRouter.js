const ProductsController = require("../controllers/ProductsController");

const router = require(`express`).Router();

router.get(`/`, ProductsController.getAll);
router.get(`/:id`, ProductsController.getDetailProduct);
router.post(`/`, ProductsController.addProduct);

module.exports = router;
