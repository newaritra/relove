import runQuery from "../../handlers/runQuery";

const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { username, password } = req.body;
      const payload = {
        username,
        password,
      };
      const token = jwt.sign(payload, "SECRET", { expiresIn: "10d" });
      if (token) {
        const present = await runQuery(
          `SELECT * FROM Users WHERE username=? AND password=?`,
          [username, password]
        );
        if (!present.length)
          return res.status(403).json({
            message: "This user is not registered. Check your credentials.",
          });
        const { id } = present[0];
        return res.json({ token, id, username, message: "Login successful" });
      } else
        return res
          .status(401)
          .json({ message: "Check your credentials please" });
    } catch (err) {
      console.log(err);
      res.status(403).json({ message: "Login unsuccessful" });
    }
  } else {
    res
      .status(404)
      .json({ message: "This api method is not available on thsi route." });
  }
}
