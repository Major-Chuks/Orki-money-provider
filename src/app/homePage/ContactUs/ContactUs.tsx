import Button from "@/components/Button/Button";
import classes from "./ContactUs.module.css";
import bg from "@/assets/contactUs-bg.png";
import coin1 from "@/assets/coin-1.svg";
import coin2 from "@/assets/coin-2.svg";
import coin3 from "@/assets/coin-3.svg";
import coin4 from "@/assets/coin-4.svg";
import Responsive from "@/components/Responsive/Responsive";
import Image from "next/image";

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

  return (
    <Responsive style={{ maxWidth: "1312px" }}>
      <div
        style={{ backgroundImage: `url(${bg.src})` }}
        className={classes.container}
      >
        <div className={classes.heading}>
          <div className={classes.title}>{_title}</div>
          <div className={classes.description}>{_description}</div>
        </div>
        <Button style={{ width: "max-content", alignSelf: "center" }}>
          Contact Us
        </Button>
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
      </div>
    </Responsive>
  );
};

export default ContactUs;
