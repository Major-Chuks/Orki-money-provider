"use client";

const Widget = () => {
  return (
    <iframe
      src="https://orki-widget.vercel.app/"
      width="100%"
      height="100%"
      allow="camera;fullscreen;accelerometer;gyroscope;magnetometer;payment"
      allowFullScreen
      style={{
        width: "100%",
        maxWidth: "482px",
        height: "748px",
        background: "#fff",
        border: "none",
        boxShadow: "0px 2px 50px 0px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
      }}
      title="Orki Money"
    ></iframe>
  );
};

export default Widget;
