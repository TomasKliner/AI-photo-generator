import * as dotenv from 'dotenv';

dotenv.config();

import {OpenAI} from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI,

});

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/image', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: '512x512'
    });

    const image = response.data.data[0].url;
    res.send({image});
});


app.listen(8080, () => {
    console.log('Server listening on port 8080 http://localhost:8080/image');
})