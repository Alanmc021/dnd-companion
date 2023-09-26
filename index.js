const express = require("express")
const serviceAccount = require("./key.json");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const admin = require("firebase-admin");
const PORT = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dnd-companion-9cbb7-default-rtdb.firebaseio.com"
});

// Criar novo player 
app.post("/player", (req, res) => {
    const player = req.body

    admin.database().ref("players").push(player)
        .then(() => {
            res.status(201).send("Jogador Criado com sucesso")
        })
        .catch((erro) => {
            res.status(400).send(erro)
        })

})


// Deletar Player 
//-NfH_jBfSkVifAcRWeix
app.delete("/player/:id", (req, res) => {
    const id = req.params.id

    admin.database().ref(`players/${id}`).remove()
        .then(() => {
            res.send("Jogador removido")
        })
        .catch((erro) => {
            res.status(400).send(erro)
        })

})





// Atualizar Player 
// app.put("", () => { })
// // Deletar Player 
// app.delete("", () => { })
// // Buscar todos os player
// app.get("", () => { })
// // Buscar somente um player
// app.get("", () => { })


app.listen(PORT, () => {
    console.log(`Server runnig in port ${PORT}`)
})

