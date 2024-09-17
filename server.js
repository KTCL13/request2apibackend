const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const getImageAsBase64 = async (url) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary').toString('base64');
};

app.get("/cat-dog", async (req, res) => {
    const {textCat}=req.query

    let catImg = null



    await fetch(`https://cataas.com/cat/says/${textCat}?fontSize=50&fontColor=red`)
      .then(response => response)
      .then(data => {
       catImg = Buffer.from(data.url,'binary').toString('base64');
    }); 
    
    let dogImage = null
    
    await fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        dogImage = Buffer.from(data.message,'binary').toString('base64');
    });
    res.json({
      catImg: `data:image/jpeg;base64,${catImg}`,
      dogImg: `data:image/jpeg;base64,${dogImage}`
    })
  });



app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });