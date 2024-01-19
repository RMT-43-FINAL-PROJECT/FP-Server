const StoresController = require("../controllers/StoresController");

const router = require(`express`).Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get(`/`, StoresController.getAll);
router.post(`/`, upload.single(`photo`), StoresController.addStore);
router.get(`/:id`, StoresController.getDetailById);

module.exports = router;
