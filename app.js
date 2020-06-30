const express = require('express')

const app = express();

app.get( '/', (req, res) => {
    console.log('called updated')
    res.send('helo world haha ')
})

app.listen( 3000, () =>{
    console.log(`my app runign in port 3000`)
});

// app.listen( 4000, () =>{
//     console.log(`my app runign in port 4000`)
// });

// docker build -t node-docker .
// docker run -it -p 9000:3000 node-docker