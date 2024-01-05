const express = require('express');
const router = express.Router();

module.exports = (socketServer) => {
    router.get('/', (req, res) => {
        res.render('realTimeProducts');
    });

    return router;
};
