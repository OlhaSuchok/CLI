const fs = require("fs").promises;
const path = require("path");
// console.log(fs);
// console.log(path);

const contactsPath = path.join("db/contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    console.log("Отримали список контактів");
    const response = await fs.readFile(contactsPath);
    const data = JSON.parse(response);
    console.table(data);
  } catch (error) {
    console.log(error);
  }
}

function getContactById(contactId) {
  console.log("Отримали контакт по його id");
}

function removeContact(contactId) {
  console.log("Видалили контакт по його id");
}

function addContact(name, email, phone) {
  console.log("Додали контакт по його id");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
