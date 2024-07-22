const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => console.log('connection MongoDB Database Successful'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.get('/', (req, res) => res.send('API is running...'));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
