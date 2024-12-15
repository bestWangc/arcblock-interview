const middlewares = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();


const {getUser,saveUser} = require("../controller/user")

// router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

router.get('/user', getUser);

router.put('/user/:id', saveUser);

module.exports = router;
