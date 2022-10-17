import "./App.css";
import { useState } from "react";
import { SendSinglePhoto, SinglePicToPdf } from "./api/PicToPdf";

function App() {
  const [img, setimg] = useState("");
  const [nameOfPdf, setNameOfPdf] = useState("");

  const PhotoToPdf = async () => {
    try {
      const response = await SinglePicToPdf(nameOfPdf);
      const file = new Blob([response.data], { type: "application/pdf" });
      let fileURL = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `FileName.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await SendSinglePhoto(img).then((res) => {
        setNameOfPdf(res.data?.path);
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="App">
      <label>Pic to Pdf Single Image</label>
      <input
        name="images"
        onChange={(e) => {
          setimg(e.target.files[0]);
        }}
        type="file"
      />
      <h1>{nameOfPdf}</h1>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={PhotoToPdf}>Download PDF</button>
    </div>
  );
}

export default App;
