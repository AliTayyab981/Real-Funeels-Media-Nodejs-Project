const express = require('express');
const { getContact, createContact, updataContact, deleteContact, getContactById } = require('../controllers/contactController');
const validationToken = require('../middleware/validationTokenHandler');
const router = express.Router();

router.use(validationToken)

router.route('/').get(getContact).post(createContact)

router.route('/:id').get(getContactById).put(updataContact)

router.route('/:id').delete(deleteContact)

module.exports = router