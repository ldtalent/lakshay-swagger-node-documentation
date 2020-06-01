//PORT
process.env.PORT = process.env.PORT || 3000

//ENVIRONMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//DB
const devDB = 'mongodb+srv://lakshay:rcLtN8oRBYQosZQ0@cluster0-loriq.mongodb.net/test?retryWrites=true&w=majority'

let urlDB = process.env.NODE_ENV === 'dev' ? devDB : process.env.URLDB

process.env.URLDB = urlDB