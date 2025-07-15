import Responsive from "@/components/Responsive/Responsive";
import classes from "./Benefits.module.css";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import checkIcon from "@/assets/swap/check.svg";
import Image from "next/image";
import cardLeft from "@/assets/auth/card-left.png";
import cardRight from "@/assets/auth/card-right.png";
import cardCenter from "@/assets/auth/card-center.png";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";

const benefits = [
  "Go live globally in minutes",
  "Access best rates via 11 aggregated liquidity providers",
  "Built-in WalletConnect for seamless EVM integration",
  "Easily customizable with theming support",
  "No-code setup—just plug and play",
  "One endpoint, 11 liquidity providers",
];

const Benefits = () => {
  const [intersecting, setIntersecting] = useState(false);
  const [itemIntersecting, setItemIntersecting] = useState(false);

  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <IntersectionObserver onIntersecting={setIntersecting}>
          <div className={classes.container}>
            <div
              className={`${classes.bannerImageContainer} ${
                intersecting && classes.trigger
              }`}
            >
              <Image src={cardLeft} alt="" />
              <Image src={cardCenter} alt="" />
              <Image src={cardRight} alt="" />
            </div>
            <div>
              <div className={classes.title}>Why Orki Swap?</div>
              <div className={classes.listContainer}>
                {benefits.map((benefit, idx) => (
                  <IntersectionObserver
                    key={idx}
                    onIntersecting={setItemIntersecting}
                  >
                    <div
                      key={idx}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                      className={`${classes.listItem} ${
                        itemIntersecting && classes.trigger
                      } `}
                    >
                      <Image src={checkIcon} alt="" /> {benefit}
                    </div>
                  </IntersectionObserver>
                ))}
              </div>
              <CustomButton
                onClick={() => router.push(routes.login)}
                style={{ width: "155px" }}
              >
                Get Started
              </CustomButton>
            </div>
          </div>
        </IntersectionObserver>
      </Responsive>
    </div>
  );
};

export default Benefits;
