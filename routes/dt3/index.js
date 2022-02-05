const router = require('express').Router();
const ContactController = require('../../controllers/dt3/ContactController');
const ResaleController = require('../../controllers/dt3/ResaleController');


router.post('/contato', ContactController.sendMail);
router.post('/revenda', ResaleController.resale);


module.exports = router;
