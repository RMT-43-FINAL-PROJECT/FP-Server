const SchedulesController = require("../controllers/SchedulesController");
const authentication = require("../middlewares.js/authentication");
const authorizationRoleAdmin = require("../middlewares.js/authorizationRoleAdmin");

const router = require(`express`).Router();

router.use(authentication)

router.get(`/`, authorizationRoleAdmin, SchedulesController.getAllschedules);
router.post(`/`, authorizationRoleAdmin, SchedulesController.createSchedules);

module.exports = router;
