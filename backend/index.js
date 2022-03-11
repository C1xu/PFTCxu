import Express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import session from "express-session";
import { CreateUser, GetUser, HashPassword } from "./db.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Session Config
const config = {
  genid: (req) => uuid(),
  secret: "keyboard cat",
  cookie: {},
  resave: false,
  saveUninitialized: true,
}

const app = Express();
app.use(cors());
app.use(session(config));
app.use(Express.static(path.join(__dirname, "../frontend/public/")));

const PORT = 80;
let requests = 0;
//const secretToken = uuid();

// app.get("/secret", (req, res) => {
//   const token = req.query.token;
//   requests++;
//   if (token === secretToken) {
//     res.send({
//       result: 200,
//       requests: requests,
//       message: "This is a very secret message.",
//     });
//   } else {
//     res.send({ result: 401, message: "Invalid token!" });
//   }
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.post("/login", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  requests++;
  GetUser(email).then((r) =>{
    console.log(r);
    if(r.length === 1){
      if(r[0].password === HashPassword(password)){
        console.log("Login Pass")
        res.send({ result: "success", email: email, name: r[0].name});
      }else{
        console.log("Login Fail")
        res.send({ result: "fail", reason: "account password does not match"});
      }  
    }else{
      console.log("Account does not exists")
      res.send({ result: "fail", reason: "account does not exists"});
    }
  });
});

app.post("/register", (req, res) => {
  const name = req.query.name;
  const surname = req.query.surname;
  const email = req.query.email;
  const password = req.query.password;
  requests++;

  GetUser(email).then((r) =>{
    if(r.length === 0){
      CreateUser(name, surname, email, password).then((r) => {
        //console.log(r);
        res.send({ result: "success", name: name, surname: surname, email: email});
      }).catch((e) => console.log(e));      
    }else{
      //console.log("Account already exists")
      res.send({ result: "fail", reason: "account already exists"});
    }
  });  
});

//console.log(secretToken);

app.listen(PORT, () => console.log("Server Listening on port: " + PORT));