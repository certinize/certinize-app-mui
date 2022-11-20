import { post, getPath } from ".";

const CERTIFICATES = "certificates";

const getCert = async (requestId) => {
  return await getPath(CERTIFICATES, requestId);
};

const generateCert = async (ecert) => {
  return await post(CERTIFICATES, ecert);
};

export { getCert, generateCert };
