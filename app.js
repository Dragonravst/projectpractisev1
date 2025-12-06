require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);

app.use(errorHandler);

module.exports = app;