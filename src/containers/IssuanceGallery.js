/* eslint-disable no-unused-vars */
import FolderIcon from "@mui/icons-material/Folder";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "mui-image";
// import { Connection, clusterApiUrl } from "@solana/web3.js";
import React from "react";
import { TfiGallery } from "react-icons/tfi";

const SOLSCAN_API_ENDPOINT =
  "https://api.solscan.io/transaction?tx=5CXFAmievcctqYr88HixAFcPpcv6FKaTYK5PKUEfcVAFyduGZPzHewSPvU1ZoUcjHnJQwAHzwxwSy3NpXmA44WfP&cluster=devnet";

const IssuanceGallery = () => {
  const { publicKey } = useWallet();
  // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const [certsData, setCertsData] = React.useState([]);
  const [certs, setCerts] = React.useState([]);

  const groupCertsByEventTitle = (certs) => {
    const groupedCerts = {};

    certs.forEach((cert) => {
      cert.attributes.forEach((attribute) => {
        if (attribute.trait_type === "event title") {
          if (groupedCerts[attribute.value]) {
            groupedCerts[attribute.value].push(cert);
          } else {
            groupedCerts[attribute.value] = [cert];
          }
        }
      });
    });

    return groupedCerts;
  };

  const getIssuedCerts = async () => {
    // const transactions = await connection.getConfirmedSignaturesForAddress2(
    //   publicKey,
    //   {
    //     limit: 100,
    //   }
    // );
    const txnResp = await fetch(
      `https://api.solscan.io/account/transaction?address=${publicKey}&cluster=devnet`
    );
    const txns = await txnResp.json();

    txns.data.forEach(async (transaction) => {
      const txn = await fetch(
        `https://api.solscan.io/transaction?tx=${transaction.txHash}&cluster=devnet`
      );
      const txnInfo = await txn.json();

      if (txnInfo.tokenBalanes.length > 0) {
        const mintData = await fetch(
          `https://api.solscan.io/account?address=${txnInfo.tokenBalanes[0].token.tokenAddress}&cluster=devnet`
        );

        const mintData_ = await mintData.json();

        const metadata = await fetch(mintData_.data.metadata.data.uri);

        const metadata_ = await metadata.json();

        setCertsData((prev) => {
          return prev.concat(metadata_);
        });
      }
    });
  };

  const fetchCerts = () => {
    if (certsData.length === 0) {
      const getIssuance = async () => {
        await getIssuedCerts();
      };

      if (publicKey) {
        getIssuance();
      }
    }
  };

  const renderCerts = () => {
    return certs.map((cert, idx) => {
      return (
        <Box
          key={idx}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Image
            src={cert.image}
            height={200}
            onClick={() => {
              window.open(cert.image, "_blank");
            }}
          />
          <Typography>{cert.name}</Typography>
        </Box>
      );
    });
  };

  const renderCertDirs = () => {
    const events = groupCertsByEventTitle(certsData);
    var folders = [];

    Object.keys(events).forEach((event, idx) => {
      folders.push(
        <Paper
          key={idx}
          sx={{
            p: 2,
            height: 36,
            width: "25%",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
            },
          }}
          onClick={() => setCerts(events[event])}
        >
          <FolderIcon fontSize="large" />
          <Typography
            variant="h6"
            sx={{
              marginLeft: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {event}
          </Typography>
        </Paper>
      );
    });

    return folders;
  };

  const renderGallery = () => {
    if (certs.length > 0) {
      return renderCerts();
    } else {
      return certsData.length === 0 ? (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        renderCertDirs()
      );
    }
  };

  React.useEffect(() => {
    fetchCerts();
  }, [publicKey]);

  return (
    <Container sx={{ height: "100vh" }}>
      <Divider textAlign="left">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TfiGallery fontSize={36} style={{ marginRight: 10 }} />
          <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 4 }}>
            Issuance Gallery
          </Typography>
        </Box>
      </Divider>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {renderGallery()}
      </Box>
    </Container>
  );
};

export default IssuanceGallery;
