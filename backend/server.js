require('dotenv').config();
const express = require('express');
const app = express();
const mongoDB = require('./config/config');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3333

mongoDB();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE", 
};
  
app.use(cors(corsOptions)); 

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/books', require('./routers/books'));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Service is healthy',
    timestamp: new Date().toISOString()
  });
});

app.use(errorHandler);

if(process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
};

if (process.env.NODE_ENV !== 'test' || require.main === module) {
    mongoose.connection.once('open', () => {
        console.log('Connected to the mongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}

module.exports = { app };