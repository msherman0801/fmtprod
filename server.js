require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI
const connection = mongoose.connection

app.use(cors());
app.use(express.json());
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true })

connection.once('open', () => {
    console.log(`MongoDB has succesfully connected`)
})

const establishmentRouter = require('./routes/establishments');
const dateTimeRouter = require('./routes/datetime')
const locationRouter = require('./routes/location')
const validationRouter = require('./routes/awaitingValidation')
app.use('/establishment', establishmentRouter);
app.use('/validation', validationRouter);
app.use('/datetime', dateTimeRouter);
app.use('/location', locationRouter);

app.use(express.static('frontend/dist'));
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server  is running on ${port}.`)
})