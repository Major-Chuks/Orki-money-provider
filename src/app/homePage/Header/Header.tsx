import classes from "./Header.module.css";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import Widget from "@/components/Widget/Widget";
import SlideUp from "@/components/SlideUp/SlideUp";
import { useEffect, useState } from "react";
import TransakIframe from "@/components/ProviderIframe/TransakIframe";
import IframeWrapper from "@/components/Widget/IframeWrapper/IframeWrapper";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import useWidth from "@/hooks/useWidth";

const Header = () => {
  const [purchaseLink, setQueryString] = useState("");
  const width = useWidth();

  const router = useRouter();

  const handleLaunch = (purchaseLink: string) => {
    setQueryString(purchaseLink);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.details}>
              <Tag />
              <div className={classes.title}>
                <SlideUp>Buying crypto just got a lot easier</SlideUp>
              </div>
              <div className={classes.description}>
                <SlideUp>
                  Maximize coverage, conversion and revenue for your Crypto or
                  NFT platform and that to providing 20x more coverage as
                  compared to working with single onramp.
                </SlideUp>
              </div>
            </div>

            <div className={classes.btnContainer}>
              <SlideUp>
                <CustomButton
                  style={{
                    padding: "12px",
                    width: width > 768 ? "155px" : "116px",
                  }}
                  outline
                >
                  Contact Sales
                </CustomButton>
              </SlideUp>
              <SlideUp>
                <CustomButton
                  onClick={() => router.push(routes.signUp)}
                  style={{
                    padding: "12px",
                    width: width > 768 ? "155px" : "116px",
                  }}
                >
                  Get Started
                </CustomButton>
              </SlideUp>
            </div>
          </div>
          <div className={classes.widgetWrapper}>
            <div className={classes.animationContainer}>
              <div
                style={{
                  display: purchaseLink ? "none" : "block",
                }}
              >
                <Widget onLaunch={handleLaunch} />
              </div>
              {/* Intended to integrate provider iframes */}
              <IframeWrapper
                style={{ display: purchaseLink ? "block" : "none" }}
              >
                <TransakIframe purchaseLink={purchaseLink} />
                <CustomButton
                  onClick={() => setQueryString("")}
                  style={{ width: "max-content", background: "#f6f6f6" }}
                >
                  Close Modal
                </CustomButton>
              </IframeWrapper>
            </div>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Header;
