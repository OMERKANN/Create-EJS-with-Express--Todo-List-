const express = require('express')
const bodyParser = require("body-parser");
const app = express()

let ıtemList =["Shoping", "Codding","Go to GYM"];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {


let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();

    
    today.toLocaleDateString("en-US", options);


    let numberDay = today.getDay();
 
    const daysOfWeek = ["Pazar","Pazartesi", "Salı", "Çarşamba", "perşembe", "Cuma", "Cumartesi"]

    let day = daysOfWeek[numberDay];

    res.render("index", {goDay: day, addItems: ıtemList});

    

});

app.post("/", (req, res) => {

    let newItem = req.body.newItem;

    ıtemList.push(newItem);

    res.redirect("/")
    
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
  
})