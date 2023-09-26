const express = require("express");
const serviceAccount = require("./key.json");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const admin = require("firebase-admin");
const PORT = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dnd-companion-9cbb7-default-rtdb.firebaseio.com",
});

// Criar novo player
app.post("/player", (req, res) => {
  const player = req.body;

  admin
    .database()
    .ref("players")
    .push(player)
    .then(() => {
      res.status(201).send("Player created sucessfully!");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Deletar Player
app.delete("/player/:id", (req, res) => {
  const id = req.params.id;

  admin
    .database()
    .ref(`players/${id}`)
    .remove()
    .then(() => {
      res.send("Player removed sucessfully!");
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
});

// Atualizar Player
app.put("/player/:id", (req, res) => {
  const player = req.body;
  const playerId = req.params.id;

  admin
    .database()
    .ref(`players/${playerId}`)
    .update(player)
    .then(() => {
      res.send("Player updated sucessfully!");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Create a DM
app.post("/dm", (req, res) => {
  const dm = req.body;

  admin
    .database()
    .ref("dm")
    .push(dm)
    .then(() => {
      res.status(201).send("Dungeon master created sucessfully!");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Update DM
app.put("/dm/:id", (req, res) => {
  const dm = req.body;
  const dmId = req.params.id;

  admin
    .database()
    .ref(`dm/${dmId}`)
    .update(dm)
    .then(() => {
      res.send("Dungeon master updated sucessfully!");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a DM
app.delete("/dm/:id", (req, res) => {
  const dmId = req.params.id;

  admin
    .database()
    .ref(`dm/${dmId}`)
    .remove()
    .then(() => {
      res.send("Dungeon Master removed sucessfully!");
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
});

// Create a Match Room
app.post("/match", (req, res) => {
  const matchRoom = req.body;

  admin
    .database()
    .ref("match")
    .push(matchRoom)
    .then(() => {
      res.status(201).send("Match room created sucessfully!");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Update a Match room
app.put("/match/:id", (req, res) => {
  const match = req.body;
  const matchId = req.params.id;

  admin
    .database()
    .ref(`dm/${matchId}`)
    .update(match)
    .then(() => {
      res.send("Match room updated sucessfully!");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a Match room
app.delete("/match/:id", (req, res) => {
  const matchId = req.params.id;

  admin
    .database()
    .ref(`dm/${matchId}`)
    .remove()
    .then(() => {
      res.send("Match room removed sucessfully!");
    })
    .catch((erro) => {
      res.status(400).send(erro);
    });
});


app.listen(PORT, () => {
  console.log(`Server runnig in port ${PORT}`);
});
