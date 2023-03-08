if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const routes = require("./routes");
const cors = require ('cors')
const port = 3000


app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})