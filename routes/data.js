import express from 'express';
var router = express.Router();

import { objectToCsv } from './utils.js'

//import objectToCsv from './utils.js'

var data = [
  {
    "id": 1,
    "forename": "Pepe",
    "surname": "Fielding"
  },
  {
    "id": 2,
    "forename": "Tim",
    "surname": "Berners-Lee"
  }
]

/* GET data listing. */
router.get('/', function(req, res, next) {
  const format = req.accepts(['application/json', 'text/csv'])
  console.log(format)
  switch(format) {
    case 'text/csv': {
      const csv = objectToCsv(data)
      res.type('text/csv').status(200).send(csv)
      break
    }
    case 'application/json':
    default:
      res.status(200).json(data)
  }
})


/* POST a new data. */

/* POST a new data. */
router.post('/', (req, res, next) => {
  //  Cal que el client enviï JSON
  if (!req.is('application/json')) {
    return res.status(415).end(); // Unsupported Media Type
  }
  let newitem = req.body
  data.push(newitem)
  return res.status(201).end()
})


/* GET a user  */
router.get('/:id', function(req, res, next) {
  let id = Number(req.params.id)
  let filtered = data.find(item => item.id === id)
  if (filtered) {
    res.status(200).json(filtered)
  } else {
    res.status(404).end()
  }
})

/* DELETE */
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = data.findIndex(item => item.id === id)
  if (index === -1) return res.status(404).end()
  data.splice(index, 1)
  return res.status(200).end()   // o 204 si vols
})

/* PUT /data/:id – actualitzar i retornar el registre actualitzat */
router.put('/:id', (req, res) => {
  // Acceptar només JSON
  if (!req.is('application/json')) {
    return res.status(415).end(); // Unsupported Media Type
  }

  const id = Number(req.params.id);
  const fid = data.findIndex(item => item.id === id);  // <- HINT: findIndex

  // Si no existeix → 404
  if (fid === -1) {
    return res.status(404).end();
  }

  
  //    Manté els valors existents i sobreescriu els que arriben.
  const payload = req.body || {};
  const updated = { ...data[fid], ...payload, id };   
  data[fid] = updated;

  // 4) Retorna el registre actualitzat
  return res.status(200).json(updated);
});

/* PUT /data/:id – idempotent: actualitza o crea */
router.put('/:id', (req, res) => {
  if (!req.is('application/json')) {
    return res.status(415).end(); // Unsupported Media Type
  }

  const id = Number(req.params.id);
  const fid = data.findIndex(item => item.id === id);
  const payload = req.body || {};

  // CREATE si no existeix
  if (fid === -1) {
    const newRecord = { id, ...payload };
    data.push(newRecord);
    return res.status(201).json(newRecord);  // 201 Created
  }

  // UPDATE si existeix
  const updated = { ...data[fid], ...payload, id }; // id de la Url
  data[fid] = updated;
  return res.status(200).json(updated);             // 200 OK
});

//Part final la e)
/* POST /data/search – busca per forename i retorna coincidències */
router.post('/search', (req, res) => {
  // Acceptem només JSON
  if (!req.is('application/json')) {
    return res.status(415).end(); // Unsupported Media Type
  }

  const { forename } = req.body || {};
 
  if (typeof forename !== 'string' || forename.trim() === '') {
    return res.status(404).json({ error: 'User not found' }); // o 422 si vols ser estricte
  }

  const needle = forename.trim().toLowerCase();

  
  const matches = data
    .filter(u => (u.forename || '').toLowerCase() === needle)
    .map(u => ({ forename: u.forename, surname: u.surname }));

  if (matches.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json(matches);
});


//per pujar
export default router