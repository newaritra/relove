import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../constants";
const Container = styled.div`
  width: 50%;
  height: 100%;
  overflow: scroll;
  border-right: 1px solid gray;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10rem;
  padding: 2rem;
  flex-wrap: wrap;
  border-bottom: 1px solid rgb(239, 243, 244);
`;

const PostTweet = styled.textarea`
  border: none;
  resize: none;
  width: 60%;
  padding: 1rem;
  white-space: pre-wrap;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    outline: 1px solid #1d9af1;
  }
  &::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

const ProfileImage = styled.div`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid black;
  background-size: contain;
  background-position: center;
  background-image: url("/llama.svg");
  background-repeat: no-repeat;
`;

const StyledButton = styled.button`
  background-color: #1d9af1;
  color: white;
  border-radius: 2px;
  border: none;
  width: 10rem;
  height: 3rem;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: 14rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const TweetContainer = styled.div`
  padding: 1.3rem 4rem 2rem;
  width: 100%;
  border-bottom: 1px solid rgb(239, 243, 244);
  & > p {
    margin: 0;
    font-size: 1.5rem;
    margin-left: 2rem;
  }
`;

const UnfollowButton = styled.button`
  width: 4rem;
  height: 1.5rem;
  background-color: black;
  border: none;
  color: white;
  font-size: 0.8rem;
  border-radius: 2rem;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tweets = ({ data, setData }) => {
  const [tweetBody, setTweetBody] = useState({
    userId: data?.userData.id,
    tweet: "",
  });
  useEffect(() => {
    setTweetBody({ ...tweetBody, userId: data?.userData.id });
  }, [data?.userData]);
  const handlePost = async () => {
    try {
      if (!tweetBody.tweet.length) return;
      const payload = tweetBody;
      setTweetBody({ ...tweetBody, tweet: "" });
      await axios.post(`${BASE_URL}/tweet`, {
        token: localStorage.getItem("token"),
        ...payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setTweetBody((tweetBody) => {
      if (e.target.value.length < 200)
        return { ...tweetBody, tweet: e.target.value };
      else return tweetBody;
    });
  };
  const handleUnfollow = async (followId) => {
    await axios.put(`${BASE_URL}/follow`, {
      token: localStorage.getItem("token"),
      followId,
      userId: data?.userData.id,
    });
    const res = await axios.post(`${BASE_URL}/feed`, {
      token: localStorage.getItem("token"),
    });
    setData(res.data);
  };
  return (
    <Container>
      <InputContainer>
        <div>
          <ProfileImage />
          <p style={{ margin: "none", fontWeight: "bold", fontSize: "1rem" }}>
            @{data?.userData.username}
          </p>
        </div>
        <PostTweet
          value={tweetBody?.tweet}
          onChange={handleChange}
          placeholder="What's goin on?"
        />
        <StyledButton
          style={{ opacity: !tweetBody.tweet.length && "50%" }}
          onClick={handlePost}
        >
          Submit
        </StyledButton>
      </InputContainer>
      {data?.feedData.map((item, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              margin: "2rem 0 0 4rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ProfileImage style={{ display: "inline-block" }} />
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                verticalAlign: "middle",
                marginLeft: "1rem",
              }}
            >
              @{item.username}
            </span>
            <UnfollowButton onClick={() => handleUnfollow(item.id)}>
              Unfollow
            </UnfollowButton>
          </div>
          <TweetContainer>
            <p>{item.tweet}</p>
          </TweetContainer>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Tweets;
