import express from 'express'
const app = express()
import bodyParser from "body-parser"
import cors from "cors"
import OpenAI from"openai";
import http from "http";
import fs from "fs"

const host = 'localhost';
const openai = new OpenAI({ apiKey: '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'});
//import { Configuration, OpenAIApi } from "openai"

app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.listen(5000, ()=> {
    console.log("Server is active on port 5000")
})


app.get ("/", async (req, res) => {
  fs.readFile(__dirname + "./public/index.html")
  .then(contents => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
  })
  .catch(err => {
      res.writeHead(500);
      res.end(err);
      return;
  });
});


app.post('/chat', async (req, res)=> {   
  console.log(req.body)
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: req.body.question }],
        model: "gpt-3.5-turbo",
      });

      res.status(200).json({message: completion.choices[0].message.content});
      console.log(completion.choices[0]);
    } catch(e) {
        res.status(400).json({message: e.message})
    }
  })