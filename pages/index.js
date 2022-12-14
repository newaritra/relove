import Head from "next/head";
import { useRouter } from "next/router";
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
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(`${BASE_URL}/feed`, {
          token: localStorage.getItem("token"),
        });
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
        router.replace("/login");
      }
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
