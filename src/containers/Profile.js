import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Image from "mui-image";
import React from "react";

import ResponsiveAppBar from "../components/ResponsiveAppBar";

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
  },
  {
    name: "officialEmail",
    label: "Official Email",
  },
  {
    name: "officialWebsite",
    label: "Official Website",
  },
];

const Profile = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <ResponsiveAppBar />
      <Container
        sx={{
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 20,
          "@media (max-width: 768px)": { flexDirection: "column" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Image
            duration={0}
            height={290}
            width={290}
            src="../images/profile.png"
          />
          <Button variant="contained" sx={{ height: 64 }}>
            Get Verified!
          </Button>
        </Box>
        <Box
          sx={{ width: 450, display: "flex", flexDirection: "column", gap: 4 }}
        >
          {fields.map((field, index) => (
            <Box
              key={index}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 15 }}>
                {field.label}
              </Typography>
              <Item> {field.label}</Item>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
export default Profile;
