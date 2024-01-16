const router = require(`express`).Router();

router.get(`/`, (req, res) => {
  res.status(200).json({ message: `INI DI ROUTE HOME` });
});
router.use(`/users`, require(`./usersRouter`));
router.use(`/products`, require(`./productsRouter`));
router.use(`/orders`, require(`./ordersRouter`));
router.use(`/schedules`, require(`./scheduleRouter`));
router.use(`/stores`, require(`./storeRouter`));

module.exports = router;
