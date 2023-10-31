const express = require('express');

const router = express.Router();

const properties = [
  {
    type: 'Apartment',
    location: 'Downtown',
    rentPrice: 1500,
    contractLength: 12, // months
    amenities: ['Swimming pool', 'Gym'],
  },
  {
    type: 'House',
    location: 'Suburb',
    rentPrice: 2000,
    contractLength: 24, // months
    amenities: ['Backyard', 'Garage'],
  },
  {
    type: 'Villa',
    location: 'Seaside',
    rentPrice: 3000,
    contractLength: 36, // months
    amenities: ['Private beach', 'Gardens'],
  },
  {
    type: 'Apartment',
    location: 'Uptown',
    rentPrice: 1800,
    contractLength: 12, // months
    amenities: ['Balcony', 'Fitness center'],
  },
  {
    type: 'House',
    location: 'Countryside',
    rentPrice: 2500,
    contractLength: 24, // months
    amenities: ['Large garden', 'Fireplace'],
  },
];

router.get('/', (req, res) => {
  res.json(properties);
});

module.exports = router;