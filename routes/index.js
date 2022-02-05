const router = require('express').Router();


router.use('/', require('./home'));
router.use('/contato', require('./contato'));
router.use('/dt3', require('./dt3'));


module.exports = router;
