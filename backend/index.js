const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')

dotenv.config()

// CORS middleware setup
app.use(
  cors({
    origin: 'https://darsihmad-asso-fe.onrender.com',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
)
app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MONGODB CONNECTED'))
  .catch((err) => console.error(err))

// Routes setup
app.use('/api/users', cors(), userRoute)
app.use('/api/pins', cors(), pinRoute)

// Start the server
const PORT = process.env.PORT || 8800
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
