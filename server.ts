import express from 'express';import dialogue from './api/dialogue.js';import story from './api/story.js';
const app=express();app.use(express.json({limit:'12kb'}));app.all('/api/dialogue',dialogue);app.all('/api/story',story);app.listen(3018,'127.0.0.1');
