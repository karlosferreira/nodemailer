const router = require('express').Router();

const ContactController = require('../controllers/ContactController');


router.get('/', ContactController.index);
router.post('/', ContactController.sendMail);
router.post('/business', ContactController.business);
router.post('/resale', ContactController.resale);
router.post('/whatsapp', ContactController.whatsapp);
router.post('/AppDT3', ContactController.app);


module.exports = router;