const express = require('express') 
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express()

// ejs view
app.set('view engine', 'ejs');

//body-parser express public file
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// create todoDB in mongoose 1

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
 // {userNewUrlParser : true}for don't show erorr version

// create item Schema 2

const itemsSchema = {
  name : "string"
};

// create mongoose model for schema 3


const Item = mongoose.model('Item', itemsSchema);

//create item array

const item1 = new Item({
  name: "Welcome top your todolist",
}) 

const defaultItems =[item1, item2, item3];

// day of the week creat and call ejs

app.get('/', (req, res) => {

  
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var today = days[new Date().getDay()];

    //find mongoose model for show page "/" item lsit
    Item.find({}, function(err, foundItems){

      
      if(foundItems.length === 0){

        // item arry insert Item Model
        Item.insertMany(defaultItems, function(err) {
          if(err)
          {console.log("items is error")
        }else{
          console.log("good job")
        }
        });
        res.redirect("/")
      }else{
        res.render("index", {listTitle: today, addItems: foundItems});
      }

      
    });

});

// add item newItem to do page 
app.post("/", (req, res) => {

    const itemName = req.body.newItem;
     
    const item = new Item({
      name: itemName
    })

    item.save();

    res.redirect("/")
});

// add workItems to page
app.get('/Work', (req, res) => {
  res.render("index", {listTitle: "Work", addItems: workItems });
  
  });


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
  
})