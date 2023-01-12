var express = require("express");
var bodyParser = require("body-parser");

server = express();

server.use(express.static("moew"));//要跑在伺服器上的首頁母資料夾

server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

var DB = require("nedb-promises");       //定義資料庫
var PortfolioDB = DB.create("portfolio.db");
PortfolioDB.insert([
    {
        id: "Product1",
         imgSrc: "./img/花香_貓.jpg",
        title: "花香調",
         price: "NT880",
         slogan: "前調：粉紅胡椒、綠柑橘、黑醋栗<br/>中調：千葉玫瑰、天竺葵<br/>後調：廣藿香、白麝香、橡苔<br/>",
     },
    {
         id: "Product2",
         imgSrc: "./img/果香_活潑_狗.jpg",
         title: "果香調",
         price: "NT880",
         slogan: "前調：無花果葉<br/>中調：無花果乳<br/>後調：無花果木、白雪松<br/>",
     },
    {
         id: "Product3",
         imgSrc: "./img/麝香_兔.jpg",
        title: "麝香調",
         price: "NT880",
        slogan: "前調：香檸檬、小荳蔻、粉紅胡椒<br/>中調：茉莉、晚香玉、依蘭<br/>後調：琥珀、安息香脂、椰子<br/>",
     },
   {
        id: "Product4",
        imgSrc: "./img/木質_沈穩_藍貓.jpg",
         title: "木質調",
         price: "NT880",
         slogan: "前調：皮革<br/>中調：檀香木<br/>後調：雪松、香根草<br/>",
    },
 ])
var Games = DB.create("game.db");
Games.ensureIndex({fieldName:"id", unique:true});

server.get("/service", function(req, res){

    Services = [
        { icon: "fa-shopping-cart", title: "E-Commerce", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem." },
        { icon: "fa-laptop", title: "Responsive Design", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime qua architecto quo inventore harum ex magni, dicta impedit." },
        { icon: "fa-lock", title: "Web Security", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit." }
    ]
    res.send(Services);
})

server.get("/portfolio", function(req, res){
    
    PortfolioDB.find({}).then(results => {
        if(results !=null){
            res.send(results);
        }else{
            res.send("Error!")
        }
    }) 
    
})

server.get("/contact", function(req, res){
    res.send("");
    res.redirect("/index Vue.html"); //找檔案時只需要找index.html
});
 
server.post("/contact", function(req, res){
    console.log(req.body);
    ContactDB.insert(req.body);     //加入資料庫
    res.redirect("/index Vue.html");  //找檔案時只需要找index.html
})


server.listen(8080, function(){
    console.log("Server is running at port 8080!")
})