const express = require('express')
const { callData } = require('./chain');
const app = express();

app.get( '/', (req, res) => {
    console.log('called updated')
     callData().then((result) =>{
        res.send(result)
     })
     .catch((error) =>{
         console.log(error)
         res.send(error)
     })
        
})

app.listen( 3000, () =>{
    console.log(`my app runign in port 3000`)

});

// app.listen( 4000, () =>{
//     console.log(`my app runign in port 4000`)
// });

// docker build -t node-docker .
// docker run -it -p 9000:3000 node-docker