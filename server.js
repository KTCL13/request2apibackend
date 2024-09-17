const express = require("express");
const cors = require("cors");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());



app.get("/cat-dog", async (req, res) => {
    const {textCat}=req.query

    let catImg = null
    let dogImg = null

    const response1 = await axios.get(`https://cataas.com/cat/says/${textCat}?fontSize=50&fontColor=red`,{ responseType: 'arraybuffer' });
    catImg = Buffer.from(response1.data,'binary').toString('base64');


    
    let dogImageUrl = null
    
    await fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
       dogImageUrl= data.message;
    });

    const response2 = await axios.get(dogImageUrl,{ responseType: 'arraybuffer' });
    dogImg = Buffer.from(response2.data,'binary').toString('base64');

    res.json({
      catImg: `data:image/jpeg;base64,${catImg}`,
      dogImg: `data:image/jpeg;base64,${dogImg}`
    })
  });



app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });