const express = require('express')
const bodyParser = require("body-parser");
const app = express()

let ıtemList =["Shoping", "Codding","Go to GYM"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {


let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();

    
    today.toLocaleDateString("en-US", options);


    let numberDay = today.getDay();
 
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = daysOfWeek[numberDay];

    res.render("index", {listTitle: day, addItems: ıtemList});

    

});

app.post("/", (req, res) => {

    console.log(req.body)

    let ıtem = req.body.newItem;

    if(req.body.list === "Work"){
      workItems.push(ıtem);

      res.redirect("/work");
    } else

    ıtemList.push(ıtem);

    res.redirect("/")
    
})

app.get('/Work', (req, res) => {


  res.render("index", {listTitle: "Work", addItems: workItems });
  
  });


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
  
})