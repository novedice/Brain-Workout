const jwt = require("jsonwebtoken");
const sessionController = require("../controller/sessionController");

module.exports = async function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    // console.log("!!!!!!!!req", req.path, req.url);
    // console.log("cookie:", req.cookies);
    // console.log("auth:", req.auth);
    // console.log("headers auth:", req.headers.auth);

    const token = await req.headers.auth.split(" ")[1]; // Bearer eq4q23qe32...
    if (!token) {
      return res.status(401).json({ message: "User is not authorized!" });
    }
    // console.log("token in middleware", token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("decoded", decoded.id);
    const session = await sessionController.get(decoded.sessionId);
    if (session && session.token !== token) {
      // console.log("session", session);
      return res.status(401).json({ message: "User is not authorized!" });
    }
    req.token = token;
    req.user = decoded;

    next();
  } catch (e) {
    // console.log("error ", e.message);
    // console.log("error ", e);
    res
      .status(401)
      .json({ message: `${e.message} in catch block authMiddleware` });
  }
};
