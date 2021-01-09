import React from "react";
import "./css/App.css";
import "./css/bootstrap.css";
import "./css/style.css";
import ScalesPage from "./fretboard/pages/scales_page_component";

function App() {
  return (
    <>
      <div className="smallScreen" style={{
        width: "100vw",
        height: "100vh",
        fontSize: "xx-large",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20%",
      }}>
        Please resize your browser to be at least 1000px wide 
      </div>
      <div className="bigScreen">
        <ScalesPage />
      </div>
    </>
  );
}

export default App;
