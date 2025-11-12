import express from 'express'
// import http from 'http'
//import logger from 'morgan'
//import cors from 'cors'

import indexRouter from './routes/index.js'
import userRouter from './routes/user.js'
import dataRouter from './routes/data.js';

//Swagger
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

var app = express()

//app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors())

//swagger
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const openapiPath = path.join(__dirname, 'openapi.yaml')
const openapiDoc = YAML.parse(fs.readFileSync(openapiPath, 'utf8'))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDoc))


app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/data', dataRouter)

/** Create express-based http server */
// var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
export default app