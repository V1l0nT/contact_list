// frontend/contact-manager-app/src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Импортируем стили

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // Состояние для телефона
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get("http://localhost:5000/contacts");
    setContacts(response.data);
  };

  const addContact = async () => {
    if (!name || !phone) return; // Проверка на заполнение всех полей
    if (editId) {
      await axios.put(`http://localhost:5000/contacts/${editId}`, {
        name,
        phone,
      });
      setEditId(null);
    } else {
      const response = await axios.post("http://localhost:5000/contacts", {
        name,
        phone,
      });
      setContacts([...contacts, response.data]);
    }
    setName("");
    setPhone("");
    fetchContacts(); // Обновляем список контактов
  };

  const editContact = (contact) => {
    setEditId(contact.id);
    setName(contact.name);
    setPhone(contact.phone); // Заполнение поля телефона
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/contacts/${id}`);
    fetchContacts(); // Обновляем список контактов
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Список контактов</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск контакта"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя контакта"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Телефон"
      />
      <button onClick={addContact}>
        {editId ? "Обновить контакт" : "Добавить контакт"}
      </button>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <div>
              <button className="edit" onClick={() => editContact(contact)}>
                Редактировать
              </button>
              <button
                className="delete"
                onClick={() => deleteContact(contact.id)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
