const express = require("express");
const router = express.Router();
const { Request } = require("../Models/requests"); // Import your Sequelize model

// POST request to create a new request
router.post("/", async (req, res) => {
    try {
        const { userName, email, typeOfService, phoneNumber, message } =
            req.body;
        if (!userName || !email || !typeOfService || !phoneNumber || !message) {
            res.status(400).json({ error: "Please provide all required fields" });
            return;
        }
        if (!email.match(/\S+@\S+\.\S+/)) {
            res.status(400).json({ error: "Please provide a valid email address" });
            return;
        }
        if (!phoneNumber.match(/^[0-9]{10}$/)) {
            res.status(400).json({ error: "Please provide a valid phone number" });
            return;
        }
        const newRequest = await Request.create({
            userName,
            email,
            typeOfService,
            phoneNumber,
            message,
        });
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE request to delete a request by ID
router.delete("/:id", async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ error: "id is required" });
            return;
        }
        const requestId = req.params.id;
        await Request.destroy({ where: { id: requestId } });
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET request to fetch all requests
router.get("/", async (req, res) => {
    try {
        const allRequests = await Request.findAll();
        res.status(200).json(allRequests);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET request to fetch a request by ID
router.get("/:id", async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await Request.findByPk(requestId);
        if (!request) {
            res.status(404).json({ error: "Request not found" });
        } else {
            res.status(200).json(request);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
