import React from "react";

const ModalContainer = styled.div`
  width: 10rem;
  height: 8rem;
  position: absolute;
  margin: auto auto;
  border: 2px solid darkgray;
  color: orangered;
  padding: 2rem;
`;
const ErrorModal = (error) => {
  return (
    <ModalContainer>
      <h3>Error Modal</h3>
      {error}
    </ModalContainer>
  );
};

export default ErrorModal;
