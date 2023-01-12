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
        id: "portfolio1",
         imgSrc: "./img/羽辰.jpg",
         number: "1410922012",
         name: "洪羽辰",
         work: "工作內容：網站程式製作/企劃書製作/報告",
     },
    {
         id: "portfolio2",
         imgSrc: "./img/K.jpg",
         number: "1410922015",
         name: "葉冠郁",
         slogan: "網站程式製作＆優化/網站發想/介面設計/簡報製作",
     },
    {
         id: "portfolio3",
         imgSrc: "./img/地瓜.jpg",
        number: "1410922016",
        name: "廖芷瑩",
        slogan: "插畫繪製/小動圖製作/商品設計/簡報製作",
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