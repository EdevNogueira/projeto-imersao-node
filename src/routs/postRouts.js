import express from "express";// Importa o framework Express para criar e gerenciar o servidor.

// Importa o pacote Multer para lidar com upload de arquivos.
import multer from "multer";

// Importa as funções do controlador de posts.
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postController.js";

import cors from "cors";
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
// Configura o armazenamento para o Multer, definindo o diretório de destino e o nome do arquivo.
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão armazenados.
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome com que o arquivo será salvo no servidor.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Inicializa o Multer com as configurações de destino e armazenamento.
const upload = multer({ dest: "./uploads", storage });
// Para sistemas Linux ou Mac, outra configuração básica de destino pode ser usada.
// const upload = multer({ dest: "./uploads" });

const routs = (app) => {
    // Habilita o middleware para interpretar o corpo das requisições no formato JSON.
    app.use(express.json());
    app.use(cors(corsOptions));
    // Define a rota para buscar todos os posts, vinculada à função listarPosts.
    app.get("/posts", listarPosts);
    
    // Define a rota para criar um novo post, vinculada à função postarNovoPost.
    app.post("/posts", postarNovoPost);
    
    // Define a rota para upload de imagens, vinculada à função uploadImagem.
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função de rotas para uso em outros arquivos.
export default routs;
