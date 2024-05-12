const express = require("express");
const router = express.Router();
const ContactMessage = require("../Models/contactMessage");

// GET all contact messages
router.get("/", async (req, res) => {
    try {
        const allMessages = await ContactMessage.findAll();
        res.status(200).json(allMessages);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET a contact message by ID
router.get("/:id", async (req, res) => {
    try {
        const messageId = req.params.id;
        const message = await ContactMessage.findByPk(messageId);
        if (!message) {
            res.status(404).json({ error: "Contact message not found" });
        } else {
            res.status(200).json(message);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST a new contact message
router.post("/", async (req, res) => {
    try {
        const { userName, email, phoneNumber, message } = req.body;
        const newMessage = await ContactMessage.create({
            userName,
            email,
            phoneNumber,
            message,
        });
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a contact message by ID
router.delete("/:id", async (req, res) => {
    try {
        const messageId = req.params.id;
        await ContactMessage.destroy({ where: { id: messageId } });
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
