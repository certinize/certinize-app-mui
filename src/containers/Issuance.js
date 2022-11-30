import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import TitleIcon from "@mui/icons-material/Title";
import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { BiTransferAlt } from "react-icons/bi";

import PageSection from "../components/PageSection";
import CertificatePreview from "./CertificatePreview";
import EventTitleField from "./EventTitleField";
import RecipientTable from "./RecipientTable";
import TemplateEditor from "./TemplateEditor";
import TemplateSelection from "./TemplateSelection";

const Issuance = () => {
  const [eventTitle, setEventTitle] = React.useState("");
  const [recipients, setRecipients] = React.useState([]);
  const [certTemplate, setCertTemplate] = React.useState("");
  const [certMeta, setCertMeta] = React.useState({});

  const pageSections = [
    {
      icon: <TitleIcon sx={{ fontSize: 48 }} />,
      title: "Event Title",
      description:
        "Enter an event title! Titles help you organize and find certificates.",
      children: (
        <EventTitleField
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
        />
      ),
      pageHeight: 100,
    },
    {
      icon: <PersonAddIcon sx={{ fontSize: 48 }} />,
      title: "Add Recipient",
      description: "Add your recipients!",
      children: (
        <RecipientTable recipients={recipients} setRecipients={setRecipients} />
      ),
      pageHeight: 100,
    },
    {
      icon: <FolderIcon sx={{ fontSize: 48 }} />,
      title: "Choose Template",
      description: "Choose a template for your certificate.",
      children: (
        <TemplateSelection
          certTemplate={certTemplate}
          setTemplate={setCertTemplate}
        />
      ),
      pageHeight: 120,
    },
    {
      icon: <EditIcon sx={{ fontSize: 48 }} />,
      title: "Edit Layout",
      description: "Adjust the positions of the elements on the certificate.",
      children: (
        <TemplateEditor template={certTemplate} setCertMeta={setCertMeta} />
      ),
      pageHeight: 120,
    },
    {
      icon: <PreviewIcon sx={{ fontSize: 48 }} />,
      title: "Preview Certificate",
      description: "Make sure everything looks good!",
      children: (
        <CertificatePreview
          recipients={recipients}
          certTemplate={certTemplate}
          certMeta={certMeta}
        />
      ),
      pageHeight: 100,
    },
  ];

  const createPageSections = () => {
    return pageSections.map((pageSection, index) => {
      return (
        <PageSection
          key={index}
          icon={pageSection.icon}
          title={pageSection.title}
          description={pageSection.description}
          height={pageSection.pageHeight}
        >
          {pageSection.children}
        </PageSection>
      );
    });
  };

  return (
    <>
      <Container>
        <Divider textAlign="left">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BiTransferAlt fontSize={36} style={{ marginRight: 10 }} />
            <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 4 }}>
              Issue Certificate
            </Typography>
          </Box>
        </Divider>
      </Container>
      {createPageSections()}
    </>
  );
};

export default Issuance;
