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
  })
)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MONGODB CONNECTED'))
  .catch((err) => console.log(err))

app.use('/api/users', userRoute)
app.use('/api/pins', pinRoute)

app.listen(8800, () => {
  console.log('backend server running')
})
