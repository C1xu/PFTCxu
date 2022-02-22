import Express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = Express();
const PORT = 3001;

// app.get("/hello", (req,res) => {
//     const username = req.query.username;
//     const password = req.query.password;
//     console.log(username + " " + password);
//     if( username == "joe" && password == "123"){
//         res.send("Hola Joe");
//     }else{
//         res.send("Not Joe");
//     }
// });

const secretToken = uuid();
let requests = 0;

//25ff5d94-183a-4062-ac4c-3e56351e5d3c
app.get("/secret", (req,res) => {
    const token = req.query.token;
    requests++;
    if( token == secretToken){
        res.send({code: 200, requests: requests, message:"Hola Secret"});
    }else{
        res.send({code: 401, message:"Invalid token"});
    }
});

app.post("/login", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    requests++;
    if (username == "joe" && password == "123") {
      res.send("Hello Joe!");
    } else {
      res.send("Invalid credentials!");
    }
  });

app.use(cors());

console.log(uuid());

app.listen(PORT, () =>
    console.log("Server Listening on port: " + PORT));
