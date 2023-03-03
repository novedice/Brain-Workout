const jwt = require('jsonwebtoken');
const sessionController = require('../controller/sessionController');

module.exports = async function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();
  }
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1] // Bearer eq4q23qe32...
    if (!token) {
      return res.status(401).json({message: 'User is not authorized!' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const session = await sessionController.get(decoded.sessionId);
    if (session.token !== token) {
      return res.status(401).json({message: 'User is not authorized!'});
    }
    req.token = token; 
    req.user = decoded;
    
    next();
  } catch (e) {
    res.status(401).json({message: e.message});
  }
}