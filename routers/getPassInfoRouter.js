import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import wkhtmltoimage from 'wkhtmltoimage';

wkhtmltoimage.setCommand(
  'C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltoimage.exe'
);

const getPassRouter = express.Router();

getPassRouter.post('/', async (req, res) => {
  const { name, productName, price, src, id, size, country, date } = req.body;

  const content = `
  <style>
  body, html, div {
    margin: 0;
    padding: 0;
}
  @font-face {
    font-family: 'Messapia-bold';
    src: local('Messapia-bold'),
      url('../fonts/Messapia-Bold.woff2') format('woff2'),
      url('../fonts/Messapia-Bold.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Messapia-regular';
    src: local('Messapia-regular'),
      url('../fonts/Messapia-Regular.woff2') format('woff2'),
      url('../fonts/Messapia-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  .background{
    background-image: url('https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 470px;
    height: calc(100% - 20px);
    margin:10px 12px;
    -webkit-border-radius: 10%;
    border:3px solid black;
  }
  .pass-block{
    padding-bottom:30px;
  }
  .image-block{
    display: -webkit-box;
    margin:auto;
    -webkit-box-pack: justify;
    position:relative;
    min-height:170px;
  }
  .image1{
    position:absolute;
    left:6px;
    top:6px;
  }
  .image2{
    position:absolute;
    right:55px;
  }
  .image-border{
    position:absolute;
    left:55px;
    -webkit-border-radius:8px;
  }
  .content-block{
    padding-bottom:20px;
    padding-top:5px;
    padding-left:10px;
    width:400px;
    margin:auto;

  }
  h1{
    font-size:34px;
    font-family: 'Messapia-bold', fallback-fonts, sans-serif !important;
    text-align:center
  }
  p{
    font-size: 21px;
    color: #000;
    font-family: 'Messapia-bold', fallback-fonts, sans-serif !important;
  }
  .logo-block{
    padding-top:35px;
    text-align:center;
  }

  </style>
  <div class="background">
  <div class="pass-block" > 
  <div class="logo-block">
  <h1>DIGITAL PASS</h1>
  </div>
  <div class="content-block">
  <p><b>Name:</b> ${productName}</p>
  <p  style=" margin-top:-10px"><b>Brand:</b> ${name}</p>
  <p  style=" margin-top:-10px"><b>Size:</b> ${size}</p>
  <p  style=" margin-top:-10px"><b>Price:</b> ${price} </p>
  <p  style=" margin-top:-10px"><b>Origin Country:</b> ${country}</p>
  <p  style=" margin-top:-10px"><b>Date Made:</b> ${date}</p>
  </div>  
  <div class="image-block">
  <div class="image-border" style="width: 150px; height: 150px; background:black;">
  <img class="image1" src=${src} style="width: 138px; height: 138px;" />
  </div>
  <img class="image2"  src='https://th.bing.com/th/id/OIP.8p4DjO6vmzN9Is8Tg2uaRwHaHc?w=211&h=212&c=7&r=0&o=5&pid=1.7' style="width: 150px; height: 150px;" />
  </div>
  <p style="text-align:center"><b>Identification Number</b></p>
  <p style="text-align:center; margin-top:-15px">${id}</p>
  </div>
 </div>
`;

  const currentDirectory = fileURLToPath(import.meta.url);
  const htmlFolderPath = path.join(currentDirectory, '..', '..', 'ordersHtml');
  const htmlFilePath = path.join(htmlFolderPath, `${id}.html`);
  const jpgFilePath = path.join(htmlFolderPath, `${id}.jpg`);

  try {
    if (!fs.existsSync(htmlFolderPath)) {
      fs.mkdirSync(htmlFolderPath);
    }

    if (fs.existsSync(jpgFilePath)) {
      console.log('JPG for this order ID already exists.');
      res.send({
        success: true,
        message: 'JPG already exists for this order ID.',
      });
      return;
    }

    fs.writeFileSync(htmlFilePath, content);

    wkhtmltoimage.generate(
      content,
      {
        output: jpgFilePath,
        width: 500,
      },
      function (code, signal) {
        if (code !== 0) {
          console.error('Error converting to JPG:', code, signal);
          res
            .status(500)
            .send({ success: false, message: 'Failed to convert to JPG' });
          return;
        }
        console.log('JPG Generated');
        res.send({
          success: true,
          message: 'Data received and JPG generated!',
        });
      }
    );
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

export default getPassRouter;
