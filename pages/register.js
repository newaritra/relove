import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../constants";
import { context } from "../context/LoginContext";
const RegisterContainer = styled.form`
  height: 100vh;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 1rem lightgray;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 27rem;
  height: 3rem;
  border: 1.8px solid darkgray;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  padding: 0.5rem;
`;

const Label = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1d9af1;
  font-family: Arial, Helvetica, sans-serif;
`;

const LargeLabel = styled(Label)`
  font-size: 2rem;
  letter-spacing: 0.1rem;
`;

const StyledImage = styled.img`
  width: 8rem;
  object-fit: contain;
`;

const StyledButton = styled.button`
  background-color: #1d9af1;
  color: white;
  border-radius: 2px;
  border: none;
  width: 10rem;
  height: 3rem;
  margin-top: 2rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Register = () => {
  const [payload, setPayload] = useState({ username: "", password: "" });
  const router = useRouter();
  const loginContext = useContext(context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(BASE_URL);
    try {
      await axios.post(`${BASE_URL}/signin`, payload);
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <RegisterContainer onSubmit={handleSubmit}>
      <StyledImage src="/llama.svg" alt="llama" />
      <LargeLabel>LLAMAD</LargeLabel>
      <div>
        <Label>Userame</Label>
        <StyledInput
          value={payload.username}
          onChange={(e) => setPayload({ ...payload, username: e.target.value })}
        />
        <Label>Password</Label>
        <StyledInput
          value={payload.password}
          onChange={(e) => setPayload({ ...payload, password: e.target.value })}
        />
      </div>
      <StyledButton type="submit">Submit</StyledButton>
    </RegisterContainer>
  );
};

export default Register;
