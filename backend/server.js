// backend/server.js

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let contacts = []; // Массив для хранения контактов

// CRUD операции
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  const contact = { id: contacts.length + 1, ...req.body };
  contacts.push(contact);
  res.status(201).json(contact);
});

app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex((c) => c.id === parseInt(id));
  if (index !== -1) {
    contacts[index] = { id: parseInt(id), ...req.body };
    res.json(contacts[index]);
  } else {
    res.status(404).send("Contact not found");
  }
});

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter((c) => c.id !== parseInt(id));
  res.status(204).send();
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
