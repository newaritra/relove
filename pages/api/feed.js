// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import runQuery from "../../handlers/runQuery";
import checkLogin from "../../middlewares/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req;
      const queries = [];
      let userData = await runQuery(
        `SELECT * FROM Users WHERE username=? AND password=?`,
        [username, password]
      );
      userData = userData[0];
      queries.push(
        runQuery(
          `SELECT t.*,u.id,u.username FROM Tweets t,Users u WHERE t.user_id IN (SELECT followee_id FROM Follows WHERE follower_id = ?) AND t.user_id = u.id ORDER BY t.createdAt DESC`,
          [userData.id]
        )
      );
      console.log(userData.id);
      queries.push(
        runQuery(
          `SELECT * FROM Users WHERE id NOT IN (SELECT followee_id FROM Follows WHERE follower_id = ?) AND id!=?`,
          [userData.id, userData.id]
        )
      );
      const [feedData, recommendedUsers] = await Promise.all(queries);
      console.log(recommendedUsers);
      const payload = { userData, feedData, recommendedUsers };
      return res.json(payload);
    } catch (err) {
      res.status(401).json({ err });
    }
  } else {
    res
      .status(401)
      .json({ message: "This method is not available on this API route" });
  }
}

export default checkLogin(handler);
