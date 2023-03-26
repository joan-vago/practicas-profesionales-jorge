const express = require('express');
const router = express.Router();
const path = "rol"
const {getItems, getItem, createItem, updateItem, updateEstados, deleteItem} = require('../controladores/rol.controlador')

router.get(`/${path}`, getItems)

router.get(`/${path}/estado`, getItem)

router.post(`/${path}`, createItem)

router.put(`/${path}/:id`, updateItem)

router.put(`/${path}`, updateEstados)

router.delete(`/${path}/:id`, deleteItem)

module.exports = router