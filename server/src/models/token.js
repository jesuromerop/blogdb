require('dotenv').config();
const jwt = require('jsonwebtoken');
const _sign = process.env.JWT_SIGNATURE;

exports.verifyToken = async function(token) {
  try {
    return jwt.verify(token, _sign)
  }
  catch(err) {
    return 'Token invalido'
  }
}

exports.signToken = function(data) {
  return new Promise( (resolve, reject) => {
    try {
      const token = jwt.sign(data,_sign);
      resolve(token)
    }
    catch(err) {
      return reject(err)
    }
  })
}