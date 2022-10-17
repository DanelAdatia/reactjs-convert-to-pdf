import axios from "axios";

const { REACT_APP_ENDPOINT } = process.env;

export const SinglePicToPdf = async (nameOfPdf) => {
  return await axios.get(`${REACT_APP_ENDPOINT}?${nameOfPdf}`, {
    responseType: "blob",
  });
};

export const SendSinglePhoto = async (img) => {
  return await axios.post(
    `${REACT_APP_ENDPOINT}`,
    {
      images: img,
      name: "Danel",
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
