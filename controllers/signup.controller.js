const signup = require('../models/signup.model');

const signupFunction = async (req, res) => {
    const {nombre, email} = req.body;
    let emailAvailable = await signup.checkEmail(email);
    if (emailAvailable == false) {
        res.status(200).json(emailAvailable);
    } else {
        let userCreated = await signup.createUser(email, nombre);
        if (userCreated == "error") {
            res.status(200).json(userCreated);
        } else {
            const datos = {
                email: email,
            };
            const opciones = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos) 
            };
            let response = await fetch("/login", opciones).then(res => res.json());
            res.status(200).json(response);
        }
    }
    
}

const getInfo = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.getInfo, [email])
        result = data.rows
        return result
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const updateInfo = async (email, nombre, ciudad, calle, piso, codigo) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.updateInfo, [email, nombre, ciudad, calle, piso, codigo])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

module.exports = {
    signupFunction,
    getInfo,
    updateInfo
}