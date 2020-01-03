const express = require("express")
const bcrypt = require("bcryptjs")
const controller = require("../controllers/user")

const router = express.Router()

router.post('/register', controller.registerUser)
router.post('/login', controller.login)
router.put('/update/:username',controller.updateUser)
router.get('/get/info/:username', controller.getUserData)
router.get('/search?:name',controller.searchUser)

module.exports =router



