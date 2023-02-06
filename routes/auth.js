const router = require("express").Router();
const User = require('../models/User');

// register
router.post('/register', async (req, res) => {
    try {
        // instruction1
        // instruction2
        // .....
        console.log('body', req.body);
    // const req.body = {
    //     username: "kjkjkj",
    //     email: "test@test.com",
    //     password: "jjfjhjfhkv"
    // }
    // const username = req.body.username;
    // const password = req.body.password;
    // const email = req.body.email;
    const {
        username,
        email,
        password,
    } = req.body;
    const user = User({
        username,
        email,
        password,
    });
    const newUser = await user.save();
    console.log('newUser', newUser);
    res.status(200).json(req.body);
    } catch(err) {
        // bloc ddes erruerurs
        res.status(500).json(err);
    }
})

module.exports = router;