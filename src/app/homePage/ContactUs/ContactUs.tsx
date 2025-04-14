"use client";
import classes from "./ContactUs.module.css";
// import bg from "@/assets/contactUs-bg.png";
import coin1 from "@/assets/coin-1.svg";
import coin2 from "@/assets/coin-2.svg";
import coin3 from "@/assets/coin-3.svg";
import coin4 from "@/assets/coin-4.svg";
import Responsive from "@/components/Responsive/Responsive";
import Image from "next/image";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";
import GlowingDotGrid from "@/components/GlowingDotGrid/GlowingDotGrid";
import useWidth from "@/hooks/useWidth";

const ContactUs = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const _title = title || "Unite with us: For Onramping to financial victory!";
  const _description =
    description ||
    " Unlock Crypto Success: Your Shortcut to Smarter and Refined Transactions with us.";

  const width = useWidth();

  return (
    <Responsive style={{ maxWidth: "1312px" }}>
      <div
        // style={{ backgroundImage: `url(${bg.src})` }}
        className={classes.container}
      >
        <div className={classes.heading}>
          <div className={classes.title}>
            <SlideUp>{_title}</SlideUp>
          </div>
          <div className={classes.description}>
            <SlideUp>{_description}</SlideUp>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <SlideUp>
            <CustomButton
              style={{
                width: "max-content",
                alignSelf: "center",
                position: "relative",
                zIndex: "9",
              }}
            >
              Contact Us
            </CustomButton>
          </SlideUp>
        </div>
        <Image
          className={`${classes.coin} ${classes.coin1} `}
          src={coin1}
          alt=""
        />
        <Image
          className={`${classes.coin} ${classes.coin2} `}
          src={coin2}
          alt=""
        />
        <Image
          className={`${classes.coin} ${classes.coin3} `}
          src={coin3}
          alt=""
        />
        <Image
          className={`${classes.coin} ${classes.coin4} `}
          src={coin4}
          alt=""
        />

        <div className={classes.animatedBox}>
          {width > 768 ? (
            <GlowingDotGrid
              width={1180}
              height={580}
              rows={8}
              cols={16}
              dotSize={8}
              borderRadius={1000}
              dotColor="#1B7956"
              strokeColor="rgb(36, 124, 91, 0.2)"
            />
          ) : (
            <GlowingDotGrid
              width={440}
              height={580}
              rows={12}
              cols={12}
              dotSize={4}
              borderRadius={1000}
              dotColor="#1B7956"
              strokeColor="rgb(36, 124, 91, 0.2)"
            />
          )}
        </div>
      </div>
    </Responsive>
  );
};

export default ContactUs;
