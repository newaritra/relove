import checkLogin from "../../middlewares/auth";

const runQuery = require("../../handlers/runQuery");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { username, password } = req;
    const { tweet, userId } = req.body;
    await runQuery(`INSERT INTO Tweets(tweet,user_id) VALUES (?,?)`, [
      tweet,
      userId,
    ]);
    return res.json({ message: "Post successful" });
  } else {
    res.status(401).json({ message: "This API does not allow this method" });
  }
};

export default checkLogin(handler);
