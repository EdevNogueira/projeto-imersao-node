import express from "express"; // Importa o módulo Express para criar o servidor web.
import routs from "./src/routs/postRouts.js";

const app = express(); // Cria uma instância do servidor Express.
app.use(express.static("uploads"));
routs(app);

app.listen(3000, () => { // Inicia o servidor na porta 3000 e imprime uma mensagem no console.
    console.log("Servidor escutando...");
});