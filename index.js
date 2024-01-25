import express from 'express'
import fs from 'fs'
import path from 'path'
const app=express()

const PORT = 8000;

app.get('/',(req,res)=>{
  const currentTime = new Date();
        console.log(currentTime);

        const year = currentTime.getFullYear().toString();
        const month = (currentTime.getMonth() + 1).toString();
        const date = currentTime.getDate().toString();
        const hours = currentTime.getHours().toString();
        const minutes = currentTime.getMinutes().toString();
        const seconds = currentTime.getSeconds().toString();
        const todayTimestamp = `${year} - ${month} - ${date} - ${hours} - ${minutes} - ${seconds}`;
        const filepath = path.join('timestamp',`${todayTimestamp}.txt`);
    try{
        

        fs.writeFileSync(filepath, todayTimestamp, 'utf8');
        const today = fs.readFileSync(filepath, 'utf8');
        res.status(200).send(today);

    }
    catch(err){
        res.status(500).send("Error Occured");

    }
});

app.get('/getTimestamp',(req,res)=>{
    const folderpath = 'timestamp';
    fs.readdir(folderpath, (err, files) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error occurred');
        } else {
          const textFile = files.filter((file) => path.extname(file) === '.txt');
          res.status(200).json(textFile);
        }
      });

});

app.listen(PORT, () => {
    console.log("App is listening to port ", PORT);
  });
