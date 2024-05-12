require("dotenv").config();
const express = require("express");
const ServiceRequests = require("./Routes/Service_Requests");
const contactMessages = require("./Routes/contactMessages");

const app = express();

app.use(express.json());

app.use("/request", ServiceRequests);
app.use("/Contact", contactMessages);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
