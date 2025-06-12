const jwt = require("jsonwebtoken");
const USER = require("../moduls/userShcema");
const secreatkey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Amazonweb;
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ error: "No token found in cookies" });
    }

    const verifyToken = jwt.verify(token, secreatkey);
    console.log(verifyToken);

    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log(rootUser);

    if (!rootUser) {
      throw new Error("usesr no found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    console.log(error);
  }
};

module.exports = authenticate;
