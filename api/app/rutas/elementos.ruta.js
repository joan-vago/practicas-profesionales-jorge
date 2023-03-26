const express = require('express');
const router = express.Router();
const path = "elementos"
const {getItems, getItem, createItem, updateItem, deleteItem} = require('../controladores/elementos.controlador')

router.get(`/${path}`, getItems)

router.get(`/${path}/:id`, getItem)

router.post(`/${path}`, createItem)

router.put(`/${path}/:id`, updateItem)

router.delete(`/${path}/:id`, deleteItem)

module.exports = router