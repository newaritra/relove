import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
const ProfileContainer = styled.div`
  height: 100%;
  width: 28%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
`;

const ProfileInnerContainer = styled.div`
  font-size: 1rem;
  margin: auto 0;
  align-self: center;
  font-weight: bold;
`;

const ProfileImage = styled.div`
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid black;
  background-size: contain;
  background-position: center;
  background-image: url("/llama.svg");
  background-repeat: no-repeat;
`;

const wiggle = keyframes`
0%{
    transform:rotate(0deg);
    transform-origin:center ;
}
25%{
    transform: rotate(-20deg);
    transform-origin:center ;
}
75%{
    transform: rotate(20deg);
    transform-origin:center ;
}
100%{
    transform:rotate(0deg);
    transform-origin:center ;
}
`;

const StyledLogo = styled.div`
  width: 6rem;
  height: 6rem;
  align-self: flex-start;
  margin-left: -8rem;
  position: relative;
  display: inline-block;

  &:hover {
    animation-name: ${wiggle};
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-timing-function: ease;
  }
`;

const LogoName = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1d9af1;
  vertical-align: middle;
`;

const Profile = ({ data }) => {
  console.log(data);
  return (
    <ProfileContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <StyledLogo>
          <Image src={"/llama.svg"} layout={"fill"} />
        </StyledLogo>
        <LogoName>LLAMAD</LogoName>
      </div>
      <ProfileInnerContainer>
        <ProfileImage />@{data?.userData.username}
      </ProfileInnerContainer>
    </ProfileContainer>
  );
};

export default Profile;
