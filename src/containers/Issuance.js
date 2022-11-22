import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSolanaUser } from "../api/UserAPI";
import AuthModal from "../components/AuthModal";
import PageSection from "../components/PageSection";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { setPubkey, setUser, setVerification } from "../features/userSlice";
import CertificatePreview from "./CertificatePreview";
import DateSelection from "./DateSelection";
import RecipientTable from "./RecipientTable";
import TemplateEditor from "./TemplateEditor";
import TemplateSelection from "./TemplateSelection";

const Issuance = () => {
  const dispatch = useDispatch();
  const { publicKey } = useWallet();
  const { user } = useSelector((state) => state.user);

  const [issuanceDate, setIssuanceDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [recipients, setRecipients] = React.useState([]);
  const [certTemplate, setCertTemplate] = React.useState("");
  const [certMeta, setCertMeta] = React.useState({});

  const pageSections = [
    {
      icon: <CalendarMonthIcon sx={{ fontSize: 48 }} />,
      title: "Issuance Date",
      description:
        "Enter the date when the certificate was earned or presented.",
      children: (
        <DateSelection
          issuanceDate={issuanceDate}
          setIssuanceDate={setIssuanceDate}
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
          issuanceDate={issuanceDate}
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

  React.useEffect(() => {
    if (publicKey && !user) {
      authSolanaUser(publicKey.toBase58()).then((user) => {
        console.log(user);
        dispatch(setUser(user.user));
        dispatch(setPubkey(publicKey.toBase58()));
        dispatch(setVerification(user.verification));
      });
    }
  }, [publicKey]);

  return (
    <>
      <ResponsiveAppBar />
      <AuthModal pubkey={publicKey} />
      {/* <Navigation
        nextPart={nextPart}
        setNextPart={setNextPart}
        pageSections={pageSections}
      /> */}
      {createPageSections()}
    </>
  );
};

export default Issuance;
