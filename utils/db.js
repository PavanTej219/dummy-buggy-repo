// Tiny in-memory "database" so the app runs with zero setup.

const users = [
  { id: 1, name: "Asha Verma", email: "asha@example.com" },
  { id: 2, name: "Ravi Kumar", email: "ravi@example.com" },
  { id: 3, name: "Meera Iyer", email: "meera@example.com" },
];

const orders = [
  { id: 101, userId: 1, item: "Keyboard", amount: 1499 },
  { id: 102, userId: 1, item: "Mouse", amount: 499 },
  { id: 103, userId: 2, item: "Monitor", amount: 8999 },
  { id: 104, userId: 3, item: "Webcam", amount: 1999 },
  { id: 105, userId: 2, item: "Headset", amount: 2499 },
];

function findUserById(id) {
  return users.find((u) => u.id === id);
}

function getOrdersForUser(userId) {
  return orders.filter((o) => o.userId === userId);
}

module.exports = { users, orders, findUserById, getOrdersForUser };
