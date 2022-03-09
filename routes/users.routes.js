const express = require('express')

const router = express.Router()

const { 
    getAllUser,
    createUser,
    getUserById,
    //viewUser
} = require('../controllers/users.controller')

router.get('/', getAllUser)
                   
router.post('/', createUser)

router.post('/:id', getUserById)

module.exports = { usersRouter: router }