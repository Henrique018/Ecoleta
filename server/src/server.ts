import express from "express";

const app = express();

app.use(express.json());

const users = ["Henrique", "Diego"];

app.get("/users", (req, res) => {
  const search = String(req.query.search);

  const filteredUsers = users
    ? users.filter((user) => user.includes(search))
    : users;

  return res.json(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  return res.json(users[id]);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  return res.json({
    name,
    email,
  });
});

app.listen(3333, () => console.log(`App started on port 3333`));
