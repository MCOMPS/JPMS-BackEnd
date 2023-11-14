const tenant = require('./tenants.route')

module.exports = (app) => {
  app.use('/tenant', tenant);
}

// const express = require('express');

// const emojis = require('./emojis');
// const properties = require('./properties');


// const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({
//     message: 'Jazeera Properties API Version 1! - 👋🌎🌍🌏',
//   });
// });


// router.use('/emojis', emojis);
// router.use('/properties', properties);

// module.exports = router;
