import checkLogin from "../../middlewares/auth";

const runQuery = require("../../handlers/runQuery");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { userId, followId } = req.body;
    console.log(userId, followId);
    await runQuery(
      `INSERT INTO Follows(follower_id,followee_id) VALUES (?,?)`,
      [userId, followId]
    );
    return res.json("Follow request successful");
  } else if (req.method == "PUT") {
    const { userId, followId } = req.body;
    await runQuery(
      `DELETE FROM Follows WHERE follower_id=? AND followee_id=?`,
      [userId, followId]
    );
    res.json({ message: "Deletion successful" });
  } else
    res
      .status(401)
      .json({ message: "This API route doesn't support this method" });
};

export default checkLogin(handler);
