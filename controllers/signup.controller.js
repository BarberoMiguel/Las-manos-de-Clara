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

module.exports = {
    signupFunction
}