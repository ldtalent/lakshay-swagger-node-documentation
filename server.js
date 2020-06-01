require('./config/config')

const express = require('express')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const app = express()
const bodyParser = require('body-parser')

const swaggerJsonDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Documenting REST API's",
      description: "This is an implementation of how to document your RESTful API's using SWAGGER",
      servers: ['http://localhost:3000']
    },
    "components": {
      "schemas": {
        "fruits": {
          "properties": {
            "name": {
              "type": "string"
            }
          }
        }
      }
    }
  },
  apis: ['./routes/api/fruits.js']
}

const swaggerDocs = swaggerJsonDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use("/api", require('./routes/api/fruits.js'))
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(response => {
  console.log('Mongo DB Connected')
}).catch(error => {
  console.log(error)
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`)
})