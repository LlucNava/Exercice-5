import app from './apicalls.js'
const port = 3000

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, ()=>{
    console.log('Listening on port 3000')
})    

export default app

