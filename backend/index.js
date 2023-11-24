const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')

dotenv.config()
app.use(
  cors({
    origin: 'https://darsihmad-asso-fe.onrender.com/',
    headers: ['Content-Type'],
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  })
)
var corsOptions = {
  origin: function (origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    db.loadOrigins(function (error, origins) {
      callback(error, origins)
    })
  }
}
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MONGODB CONNECTED'))
  .catch((err) => console.log(err))

app.use('/api/users',cors(corsOptions), userRoute)
app.use('/api/pins', cors(corsOptions),pinRoute)

app.listen(8800, () => {
  console.log('backend server running')
})
