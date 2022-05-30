const usuarioDB = require("../../controller/db")
const seguranca = require("../components/seguranca")

async function selectUsuario(){
    const conn = await usuarioDB.connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}

async function insertUsuario(usuario){
    const conn = await usuarioDB.connect();
    const sql = 'INSERT INTO membro (cpf, nome, email, senha, telefone, data_nascimento) VALUES (?,?,?,?,?,?);';
    const values = [usuario.cpf, usuario.nome, usuario.email, usuario.senha, usuario.telefone, usuario.data];
    return await conn.query(sql, values);
}

async function deleteUsuario(id){
    const conn = await usuarioDB.connect();
    const sql = 'DELETE FROM usuario where id=?;';
    return await conn.query(sql, [id]);
}

async function updateUsuario(usuario){
    const conn = await usuarioDB.connect();
    const sql = 'UPDATE usuario SET nome=?, senha=? where id=?;';
    const values = [usuario.nome, usuario.senha, usuario.id];
    return await conn.query(sql, values);
}


async function getUsuarioId(id){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM membro where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

async function login(email, senha){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM membro where email=? and senha=?;';
    const values = [email, seguranca.ocultarsenha(senha)];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

module.exports = {selectUsuario, insertUsuario, deleteUsuario, updateUsuario, getUsuarioId, login};
