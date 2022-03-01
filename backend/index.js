import Express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import session from "express-session";
import { CreateUser } from db.js;

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

const PORT = 3001;
let requests = 0;
const secretToken = uuid();

app.get("/secret", (req, res) => {
  const token = req.query.token;
  requests++;
  if (token === secretToken) {
    res.send({
      result: 200,
      requests: requests,
      message: "This is a very secret message.",
    });
  } else {
    res.send({ result: 401, message: "Invalid token!" });
  }
});

app.post("/login", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  requests++;
  if (email == "test@test.com" && password == "123") {
    res.send({ result: "success", email: "test@test.com", name: "Name here" });
  } else {
    res.send({ result: "fail" });
  }
});

app.post("/register", (req, res) => {
  const name = req.query.name;
  const surname = req.query.surname;
  const email = req.query.email;
  const password = req.query.password;
  requests++;

  CreateUser(name, surname, email, password).then((r) => {
    console.log(r);
  })
  
  res.send({ result: "success", name: name, surname: surname, email: email})

});

console.log(secretToken);

app.listen(PORT, () => console.log("Server Listening on port: " + PORT));