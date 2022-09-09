import runQuery from "../../handlers/runQuery";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { username, password } = req.body;
    console.log(username, password);
    if (username.length && password.length) {
      const results = await runQuery(`SELECT * FROM Users WHERE username=?`, [
        username,
      ]);
      if (results.length >= 1) {
        return res.status(403).json({ message: "This user already exists" });
      } else {
        await runQuery(`INSERT INTO Users(username,password) VALUES (?,?)`, [
          username,
          password,
        ]);
        return res.json({ message: "The user has been registered" });
      }
    }
  } else {
    res.send("This method is not supported on this API route");
  }
}
