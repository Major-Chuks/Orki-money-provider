"use client";

const Widget = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "482px",
        height: "742px",
        overflow: "auto",
        boxShadow: "0px 2px 50px 0px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
      }}
    >
      <iframe
        src="https://orki-widget.vercel.app/"
        width="100%"
        height="100%"
        allow="camera;fullscreen;accelerometer;gyroscope;magnetometer;payment"
        allowFullScreen
        style={{
          border: "none",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
        title="Orki Money"
      ></iframe>
    </div>
  );
};

export default Widget;
