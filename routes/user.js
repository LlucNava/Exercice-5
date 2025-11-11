import express from 'express';
var router = express.Router();

// import your "database simulator"
import { getUsers, getUserById, createUser, updateUser } from './db.js'

import { objectToCsv } from './utils.js'

/* GET /users */
router.get('/', function(req, res, next) {
    const data = getUsers()
    const format = req.accepts(['application/json', 'text/csv'])
    console.log(format)
    switch( format ) {
        case 'application/json':
            res.status(200).json(data)          // 200 OK
            break
        case 'text/csv':
            const csvdata = objectToCsv( data )
            res.type( 'text/csv').status( 200 ).send( csvdata )
            break
        default:
            res.status( 415 ).end()   // Unsupported media type
    }
    
})

/* GET /users/{id} */
router.get('/:id', function(req, res, next) {
    let id = Number(req.params.id)
    let result = getUserById( id )
    if (result) {
      res.status(200).json(result)      // 200 OK
    } else {
      res.status(404).end()             // 404 Not found
    }
})

/* POST /users - create a new user. */
router.post('/', (req, res, next) => {
    let data = req.body

    if(
        ! data ||
        typeof data.forename !== 'string' ||
        typeof data.surname !== 'string' ||
        data.forename.trim() === '' ||
        data.surname.trim() === ''
    ) {
        res.status( 422 ).json({ error: 'Unprocessable content.'})
    }

    try {
        createUser ( data )
        res.status( 201 ).end()
    } catch (error) {
        res.status( 422 ).end()
    }
})

/* POST /users - create a new user. */
router.put('/:id', (req, res, next) => {

    let id = Number(req.params.id)
    let data = req.body
    
    if(
        ! data ||
        typeof data.forename !== 'string' ||
        typeof data.surname !== 'string' ||
        data.forename.trim() === '' ||
        data.surname.trim() === ''
    ) {
        res.status( 422 ).json({ error: 'Unprocessable content.'})
    }

    try {
        updateUser ( id, data )
        res.status( 200 ).end()
    } catch (error) {
        res.status( 422 ).end()
    }
})


export default router
