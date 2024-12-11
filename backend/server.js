// backend/server.js

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let contacts = []; // Массив для хранения контактов

// Обработка запроса на корневой URL
app.get("/", (req, res) => {
  res.send(
    "Добро пожаловать на главную страницу! Используйте /contacts для работы с контактами."
  );
});

// Получение всех контактов
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Получение контакта по ID
app.get("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === parseInt(id));
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Contact not found");
  }
});

// Создание нового контакта
app.post("/contacts", (req, res) => {
  const contact = { id: contacts.length + 1, ...req.body };
  contacts.push(contact);
  res.status(201).json(contact);
});

// Обновление существующего контакта
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

// Удаление контакта по ID
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

// Загрузка начальных данных для тестирования (опционально)
const loadInitialData = () => {
  contacts.push(
    { id: 1, name: "Контакт 1", phone: "123-456-7890" },
    { id: 2, name: "Контакт 2", phone: "098-765-4321" }
  );
};

// Загружаем начальные данные при запуске сервера
loadInitialData();
