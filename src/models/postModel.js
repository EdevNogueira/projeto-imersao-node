import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão do ambiente.

export async function getPosts() { // Função assíncrona para buscar todos os posts do banco de dados.
    const db = conexao.db("instabyte-back"); // Seleciona o banco de dados "instabyte-back".
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray(); // Busca todos os documentos da coleção e retorna como um array.
}

export async function criarPost(novoPost) {
    const db = conexao.db("instabyte-back");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("instabyte-back");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}