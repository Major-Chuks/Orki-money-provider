import { Transak } from "@transak/transak-sdk";

const TransakWidget = () => {
  const init = () => {
    const transak = new Transak({
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY as string,
      environment: Transak.ENVIRONMENTS.STAGING, // or 'PRODUCTION'
      defaultCryptoCurrency: "ETH",
      themeColor: "#5b29ec",
    });

    transak.init();
  };
  return (
    <button onClick={init} style={{ cursor: "pointer" }}>
      Init Transak
    </button>
  );
};

export default TransakWidget;
