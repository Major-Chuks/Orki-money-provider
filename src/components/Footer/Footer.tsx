import classes from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-2.svg";
import xIcon from "@/assets/icon-x.svg";
import facebookIcon from "@/assets/icon-facebook.svg";
import linkedInIcon from "@/assets/icon-linkedin.svg";
import { footerData } from "./Footer.script";
import Responsive from "../Responsive/Responsive";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";

const Footer = () => {
  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.top}>
            <div className={classes.left}>
              <div
                onClick={() => router.push(routes.home)}
                className={classes.logo}
              >
                <Image src={logo} alt="" />
              </div>
              <div className={classes.brandDescription}>
                Unite with us: For Onramping to financial victory!
              </div>
              <div className={classes.newsletter}>
                <div className={classes.text}>JOIN OUR NEWSLETTER</div>
                <input
                  placeholder="Enter email address"
                  className={classes.input}
                  type="email"
                />
              </div>
            </div>
            <div className={classes.right}>
              {Object.keys(footerData).map((key, idx) => (
                <div className={classes.nav} key={idx}>
                  <div className={classes.navTitle}>{key}</div>
                  <div className={classes.navList}>
                    {footerData[key as keyof typeof footerData].map(
                      (elem, idx) => (
                        <div key={idx}>
                          <Link href={elem?.link || "/"}>{elem?.name}</Link>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.left}>
              Copyright © {new Date().getFullYear()} Orki Inc
            </div>

            <div className={classes.socialLinkContainer}>
              <Image src={xIcon} alt="" />
              <Image src={linkedInIcon} alt="" />
              <Image src={facebookIcon} alt="" />
            </div>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Footer;
