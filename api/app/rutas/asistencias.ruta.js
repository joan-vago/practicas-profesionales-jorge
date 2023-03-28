const express = require('express');
const router = express.Router();
const path = "asistencias"
const {getItems, getItem, createItem, updateItem, deleteItem} = require('../controladores/asistencias.controlador')

router.get(`/${path}`, getItems)

router.get(`/${path}/:id`, getItem)

router.post(`/${path}`, createItem)

router.put(`/${path}`, updateItem)

router.delete(`/${path}/:id`, deleteItem)

module.exports = router