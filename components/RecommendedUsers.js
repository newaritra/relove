import React from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../constants";
const Container = styled.div`
  height: 100%;
  width: 22%;
  padding: 2rem;
  & > h1 {
    font-size: 1.2rem;
  }
`;

const UserContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FollowButton = styled.button`
  width: 6rem;
  height: 2rem;
  background-color: black;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 2rem;
  cursor: pointer;
`;

const RecommendedUsers = ({ data, setData }) => {
  const handleFollow = async (followId) => {
    await axios.post(`${BASE_URL}/follow`, {
      token: localStorage.getItem("token"),
      userId: data.userData.id,
      followId,
    });
    const res = await axios.post(`${BASE_URL}/feed`, {
      token: localStorage.getItem("token"),
    });
    setData(res.data);
  };
  return (
    <Container>
      <h1>Recommended Users</h1>
      {data?.recommendedUsers.map((item, index) => (
        <UserContainer key={item.id}>
          <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
            @{item.username}
          </p>
          <FollowButton onClick={() => handleFollow(item.id)}>
            Follow
          </FollowButton>
        </UserContainer>
      ))}
    </Container>
  );
};

export default RecommendedUsers;
