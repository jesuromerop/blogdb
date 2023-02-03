require('dotenv').config();
const jwt = require('jsonwebtoken');
const _sign = process.env.JWT_SIGNATURE;

exports.authHeader = function(req, res, next) {
  const token = req.headers['auth'];

  if(!token) {
    console.log('No tienes el header de autenticación');
    return res.status(401).send({
      msg: 'No posees un auth header'
    })
  }

  next();
}

exports.validSign = async function(req, res, next) {
  const token = req.headers['auth'];

  try {
    await jwt.verify(token, _sign);
    next();
  }
  catch(err) {
    return res.status(401).send({
      msg: "Credenciales inválidas"
    })
  }
}