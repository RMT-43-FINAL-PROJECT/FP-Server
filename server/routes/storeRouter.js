const StoresController = require("../controllers/StoresController");

const router = require(`express`).Router();

router.get(`/`, StoresController.getAll);

module.exports = router;
