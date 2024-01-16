const SchedulesController = require("../controllers/SchedulesController");

const router = require(`express`).Router();

router.get(`/`, SchedulesController.getAll);
module.exports = router;
