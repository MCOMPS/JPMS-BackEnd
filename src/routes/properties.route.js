const Router = require("express-promise-router");
const db = require('../db');
const router = new Router();

module.exports = router

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('select * from property');
        if(rows.length > 0) {
            res.json(rows); 
        } else {
            console.log("There is no entry in /property");
        }
    } catch(err) {
        console.log(err.message);
    }
 
});
