import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Image as MuiImage } from "mui-image";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authSolanaUser } from "../api/UserAPI";
import { setPubkey, setUser, setVerification } from "../features/userSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  const { publicKey } = useWallet();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (publicKey) {
    if (!user) {
      authSolanaUser(publicKey.toBase58()).then((user) => {
        dispatch(setUser(user.user));
        dispatch(setPubkey(publicKey.toBase58()));
        dispatch(setVerification(user.verification));
      });

      navigate("/issuance");
    }
  }

  return (
    <Box sx={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
      <Box
        sx={{
          height: "60%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "8vw",
          marginRight: "8vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: "3vw", fontWeight: "bold" }}>
            Get your certificates on the blockchain!
          </Typography>
          <Typography sx={{ fontSize: "1.2vw" }}>
            Blockchain-based certificates that can&apos;t be lost, tampered
            with, or forged.
          </Typography>
          <WalletMultiButton
            sx={{ height: 64, marginTop: 4, marginBottom: 4 }}
          />
        </Box>
        <MuiImage src="../images/landing.png" width="26vw" fit="contain" />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "40%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "primary.main",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            height: "7vw",
            width: "7vw",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            style={{ height: "4vw", width: "4vw", position: "absolute" }}
            src="../images/certificate.png"
          />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.25vw",
              color: "white",
              position: "absolute",
              marginTop: 220,
            }}
          >
            Certificate
          </p>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            height: "7vw",
            width: "7vw",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            style={{ height: "4vw", width: "4vw" }}
            src="../images/blockchain.png"
          />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.25vw",
              color: "white",
              position: "absolute",
              marginTop: 220,
            }}
          >
            Blockchain
          </p>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            height: "7vw",
            width: "7vw",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            style={{ height: "4vw", width: "4vw" }}
            src="../images/distributed.png"
          />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.25vw",
              color: "white",
              position: "absolute",
              marginTop: 220,
            }}
          >
            Issuance
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
