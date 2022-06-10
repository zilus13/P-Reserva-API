import express from 'express'
import bodyParser from 'body-parser'
import setWorkflows from './routes/reserva.js';


export const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/reserva', setWorkflows);
//app.use('/:workflow', startWorkflows);
//app.use('/signal', signals);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})
