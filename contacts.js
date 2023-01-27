const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  console.table(contactsArr);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  const contact = contactsArr.find((contact) => contact.id === contactId);
  console.log(contact);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  const lastId = Number(contactsArr[contactsArr.length - 1].id);
  contactsArr.push({
    id: String(lastId + 1),
    name,
    email,
    phone,
  });
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  const filtredContacts = contactsArr.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filtredContacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
