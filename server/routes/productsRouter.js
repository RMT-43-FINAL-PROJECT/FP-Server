const ProductsController = require("../controllers/ProductsController");

const router = require(`express`).Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get(`/`, ProductsController.getAll);
router.get(`/:id`, ProductsController.getDetailProduct);
router.post(`/`, upload.single('image'), ProductsController.addProduct);

module.exports = router;
