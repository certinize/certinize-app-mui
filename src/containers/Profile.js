import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "mui-image";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  borderRadius: 10,
  color: theme.palette.text.secondary,
}));

const fields = [
  {
    name: "walletAddress",
    label: "Wallet Address",
    key: "pubkey",
  },
  {
    name: "officialEmail",
    label: "Official Email",
    key: "email",
  },
  {
    name: "officialWebsite",
    label: "Official Website",
    key: "website",
  },
];

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const verification = useSelector((state) => state.user.verification);
  const navigate = useNavigate();

  const renderUserInformation = (field) => {
    if (user) return user[field.key] ? user[field.key] : "Not available";
  };

  const renderProfileStatus = () => {
    if (verification?.approved)
      return `Verified since ${verification.verified_on}`;

    if (Object.keys(verification).length > 0)
      return "We are verifying your profile!";

    return (
      <Button
        variant="contained"
        sx={{ height: 64 }}
        onClick={() => navigate("/verification-request")}
      >
        Get Verified!
      </Button>
    );
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 10,
        marginTop: 10,
        "@media (max-width: 768px)": { flexDirection: "column" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Image
          duration={0}
          height={290}
          width={290}
          fit="contain"
          src="../images/profile.png"
        />

        <Typography variant="h5" color="secondary">
          {user?.name}
        </Typography>
        {renderProfileStatus()}
      </Box>
      <Box
        sx={{
          width: 450,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginBottom: 10,
        }}
      >
        {fields.map((field, index) => (
          <Box
            key={index}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 15 }}>
              {field.label}
            </Typography>
            <Item>{renderUserInformation(field) || "Not Available"}</Item>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Profile;
