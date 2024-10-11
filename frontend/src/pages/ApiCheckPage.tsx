import { useEffect, useState } from "react";
import axiosInstance from "api/axiosInstance";
import styled from "styled-components";

export default function ApiCheckPage() {
  const [responseMessage, setResponseMessage] = useState<string>(
    "Waiting for server response...",
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const testServerConnection = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axiosInstance.get("/member/check");
      console.log(response.data);

      setResponseMessage(`Server Response: ${response.data}`);
    } catch (error) {
      setIsError(true);
      setResponseMessage("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testServerConnection();
  }, []);

  return (
    <Container>
      <Title>API Connection Test</Title>
      <Message isError={isError}>
        {isLoading ? "Connecting..." : responseMessage}
      </Message>
      <Button onClick={testServerConnection} disabled={isLoading}>
        {isLoading ? "Testing..." : "Test Again"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
`;

const Message = styled.p<{ isError: boolean }>`
  font-size: 16px;
  color: ${({ isError }) => (isError ? "#ff4d4f" : "#333")};
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #1890ff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #40a9ff;
  }
  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;
