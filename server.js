const app = require('./app.js');
require('dotenv').config();
const PORT = process.env.PORT || 4000;


app.get('/', (req, res)=>{
  res.send("Welcome to the Budget App")
});

app.listen(PORT, () => {
    console.log(`I'm am listening at Port:${PORT}`)
});