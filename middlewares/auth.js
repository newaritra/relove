const jwt = require("jsonwebtoken");
const runQuery = require("../handlers/runQuery");

function checkLogin(handler) {
  return async (req, res) => {
    try {
      const token = req.body.token;
      jwt.verify(token, "SECRET", async (err, result) => {
        try {
          if (err) {
            throw err;
          }
          const { username, password } = result;
          if (!username || !password)
            return res.status(401).json({ message: "Check credentials" });
          req.username = username;
          req.password = password;

          const present = await runQuery(
            `SELECT * FROM Users WHERE username=? AND password=?`,
            [username, password]
          );
          if (present.length) return handler(req, res);
          else return res.status(401).json({ message: "User not found" });
        } catch (err) {
          console.log(err);
          return res.status(401).json({ message: "User validation failed" });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "Not valid" });
    }
  };
}

export default checkLogin;
