const crypro = require("crypto");
const fs = require("fs").promises;
const path = require("path");
require("colors");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    console.log("Отримали список контактів:".green);
    console.table(contacts);
  } catch (error) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const findContact = contacts.find((item) => item.id === contactId);

    if (!findContact) {
      return null;
    }
    console.log("Отримали контакт по його id:".green);
    console.table(findContact);
  } catch (error) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const newContactList = contacts.filter((item) => item.id !== contactId);
    console.log("Видалений контакт по його id:".green);
    console.table(newContactList);
  } catch (error) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: crypro.randomUUID(), name, email, phone };
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);

    const isContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    if (isContact) {
      console.log("Контакт з таким імя'м вже зареєстровнний.".red);
      return;
    } else {
      const newContactList = JSON.stringify(
        [...contacts, newContact],
        null,
        "\t"
      );
      fs.writeFile(contactsPath, newContactList);
      const newList = JSON.parse(newContactList);
      console.log("Додали новий контакт:".green);
      console.table(newList);
    }
  } catch (error) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
