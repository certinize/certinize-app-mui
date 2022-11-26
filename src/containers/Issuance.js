import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import React from "react";

import PageSection from "../components/PageSection";
import CertificatePreview from "./CertificatePreview";
import RecipientTable from "./RecipientTable";
import TemplateEditor from "./TemplateEditor";
import TemplateSelection from "./TemplateSelection";

const Issuance = () => {
  const [recipients, setRecipients] = React.useState([]);
  const [certTemplate, setCertTemplate] = React.useState("");
  const [certMeta, setCertMeta] = React.useState({});

  const pageSections = [
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
      // NOTE: This does not make the page responsive.
      pageHeight: window.innerHeight > 900 ? 120 : 160,
    },
    {
      icon: <EditIcon sx={{ fontSize: 48 }} />,
      title: "Edit Layout",
      description: "Adjust the positions of the elements on the certificate.",
      children: (
        <TemplateEditor template={certTemplate} setCertMeta={setCertMeta} />
      ),
      pageHeight: window.innerHeight > 900 ? 120 : 160,
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
      pageHeight: window.innerHeight > 900 ? 100 : 120,
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

  return <>{createPageSections()}</>;
};

export default Issuance;
