const express = require('express');
const router = express.Router();
const {getItems, getItem, createItem, updateItem, deleteItem, auth} = require('../controladores/usuarios.controlador')
const path = "usuarios"

router.get(`/${path}`, getItems)

router.post(`/${path}`, createItem)

router.post(`/${path}/editar`, updateItem)

router.post(`/${path}/auth`, auth)

router.patch(`/${path}`, updateItem)

router.delete(`/${path}/:id`, deleteItem)

module.exports = router