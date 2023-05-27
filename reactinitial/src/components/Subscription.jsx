import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import LoadingMask from "./LoadingMask";

export default function Subscription() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    setIsValidEmail(validateEmail(inputValue));
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleSubmit = () => {
    if (isValidEmail) {
      const requestData = {
        email: email,
      };

      setIsLoading(true);
      setSubscriptionStatus("");

      setTimeout(() => {
        fetch("https://demoapi.com/api/series/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setIsLoading(false);
            setSubscriptionStatus("Subscribed");

            setTimeout(() => {
              setSubscriptionStatus("");
            }, 5000);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
            setSubscriptionStatus("Failed to subscribe");
          });
      }, 2000);
    }
  };

  return (
    <>
      <Box
        m={1}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItem: "center",
          textAlign: "center",
          gap: 20
        }}
      >
        {isLoading ? (
          <LoadingMask />
        ) : subscriptionStatus ? (
          <Typography variant="subtitle1">{subscriptionStatus}</Typography>
        ) : (
          <>
            <Typography variant="h4">Subscribe to our newsletter</Typography>
            <TextField
              style={{ width: 400 }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={handleEmailChange}
            />
            <Button
              style={{ width: 100 }}
              variant="outlined"
              onClick={handleSubmit}
              disabled={!isValidEmail}
            >
              Subscribe
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
