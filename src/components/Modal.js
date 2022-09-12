import React from "react";
import { useSelector } from "react-redux";

const Modal = (props) => {
  const uygulamaStatei = useSelector((state) => state);
  console.log("modaldayım", uygulamaStatei);
  const { onCancel, onConfirm, title, aciklama } = props;
  return (
    <button
      onClick={onCancel}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "50%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      >
        <h1 className="text-center">{title}</h1>
        <p className="text-center">{aciklama}</p>
        <div className="d-flex justify-content-center">
          <button
            onClick={onCancel}
            className="btn btn-sm btn-outline-danger mx-3"
          >
            Kapat
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm btn-outline-primary"
          >
            Onayla
          </button>
        </div>
      </div>
    </button>
  );
};

export default Modal;
