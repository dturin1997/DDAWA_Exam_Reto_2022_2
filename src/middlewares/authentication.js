import jwt from 'jsonwebtoken';

const authentication = async (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            let decodedData = jwt.verify(token, "secret");
            console.log(decodedData);
        }

        next();

    } catch (error) {
        console.log(error.message);
        return res.json({ mensaje: "No esta autenticado"});
        
    }

};

export default authentication;