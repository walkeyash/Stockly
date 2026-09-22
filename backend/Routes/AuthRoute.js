const { Signup, Login, userVerification, Logout } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/verify', userVerification);
router.get('/user', userVerification);
router.post('/logout', Logout);

module.exports = router;