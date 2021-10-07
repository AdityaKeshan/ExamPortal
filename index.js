let express=require('express');
let bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');
app.listen(3000,function()
{
console.log("Listening on port 3000");
});
app.get("/",function(req,res)
{
    res.send("Okay!");
});