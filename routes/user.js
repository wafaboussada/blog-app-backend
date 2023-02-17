const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.put('/:userId', async (req, res) => {
    try {
        let newHashedPassword;
        console.log('condition', req.body.id === req.params.userId)
        if (req.body.id === req.params.userId) {
        console.log('req.params.id', req.params.userId);
        if (req.body.password) {
            newHashedPassword = await bcrypt.hash(req.body.password, 10);
            // console.log('newHashedPassword', newHashedPassword);
            // req.body.password = newHashedPassword
        }
        req.body.password = newHashedPassword;
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,
            { ...req.body }, { new: true})
        res.status(200).json(updatedUser);
    } else {
        res.status(401).json('Not Allowed');
    }
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('user deleted successfully');
    } catch (err) {
        res.status(500).json(err);
    }
})
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;