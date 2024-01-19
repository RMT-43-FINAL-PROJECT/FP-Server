const StoresController = require("../controllers/StoresController");

const router = require(`express`).Router();

router.get(`/`, StoresController.getAll);
router.get(`/:id`, StoresController.getDetailById);

module.exports = router;
