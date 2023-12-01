require('dotenv').config();
const {makeApp} = require("./src/app");
const config = require("./config/app.config");

// "default" or "mock".
const app = makeApp("default");
// check routes/index.js for the model choice.

const port = config.port;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});