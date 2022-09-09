import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import { BASE_URL } from "../constants";
import Tweets from "../components/Tweets";
import RecommendedUsers from "../components/RecommendedUsers";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await axios.post(`${BASE_URL}/feed`, {
        token: localStorage.getItem("token"),
      });
      console.log(res.data);
      setData(res.data);
    })();
  }, []);
  return (
    <Container>
      <Profile data={data} setData={setData} />
      <Tweets data={data} setData={setData} />
      <RecommendedUsers data={data} setData={setData} />
    </Container>
  );
}
