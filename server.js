const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const {MongoClient} = require('mongodb')
const {isInvalidEmail, isEmptyPayload} = require('./validator.js')

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName ='company-db'
const collName='employees'

app.use(bodyparser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function(req, res) {

      // connect to db
      await client.connect()
      console.log('Connected successfully to server')

      //initiates or get the db & collection
      const db =client.db(dbName)
      const collection = db.collection(collName)

      //get data from database
      const result=await collection.findOne({id: 1})
      console.log(result)
      client.close()

      response={}

      if(result!== null){
            response = {
                name: result.name,
                email: result.email,
                hobby: result.hobby
            }
            
      }
      
      res.send(response)
})
app.post('/update-profile', async function(req, res){
      const payload = req.body
      console.log(payload)

     
      if (isEmptyPayload(payload) || isInvalidEmail(payload)){
            res.status(400).send({error: "invalid payload.couldn't update user profile"})
      }else{
            //connect to mongodb database
            await client.connect()
            console.log('Connected successfully to database server')

            //initiates or get the db & collection
            const db =client.db(dbName)
            const collection = db.collection(collName)

            //save payload data to the database
            payload['id']= 1;
            const updatedvalues ={ $set: payload }
            await collection.updateOne({id: 1}, updatedvalues, {upsert: true});
            client.close()
            

            res.status(200).send({info: "user profile data updated successfully"})
      }
      
})

const server = app.listen(3000, function(){
      console.log("app listening on port 3000")
})
 module.exports = {
      app,
      server
}