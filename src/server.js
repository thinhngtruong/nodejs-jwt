const express = require("express");
const app = express();
const initAPIs = require("./routes/api");

app.use(express.json());

initAPIs(app);

const port = process.env.PORT || 8017;

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});