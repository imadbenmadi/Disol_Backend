require("dotenv").config();
const express = require("express");
const ServiceRequests = require("./Routes/Service_Requests");

const app = express();

app.use(express.json());

app.use("/Requist", ServiceRequests);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
