require("dotenv").config();
const express = require("express");
var { graphqlHTTP } = require('express-graphql');
var cors = require('cors')
const mongoose = require("mongoose");
const app = express();
const port = 5000;

const schema = require('./schema/noteschema')

app.use(cors())
 
app.use('/graphql', graphqlHTTP({  
    schema,
    graphiql: true
}));
 
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongoose connected successfullyyy");
});
mongoose.connection.on("err", (err) => {
  console.log("mongoose error", err);
});


app.listen(port, () => {
  console.log("listening on port " + port);
});

//T4