
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const chatsFilePath = path.join(__dirname, 'chats.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// API endpoint to get all chats
app.get('/api/chats', (req, res) => {
    fs.readFile(chatsFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read chats' });
        }
        res.json(JSON.parse(data));
    });
});

// API endpoint to post a new chat
app.post('/api/chats', (req, res) => {
    const newChat = req.body;
    fs.readFile(chatsFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read chats' });
        }
        const chats = JSON.parse(data);
        chats.push(newChat);
        fs.writeFile(chatsFilePath, JSON.stringify(chats, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save chat' });
            }
            res.status(201).json(newChat);
        });
    });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
