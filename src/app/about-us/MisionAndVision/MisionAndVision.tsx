import Image from "next/image";
import classes from "./MisionAndVision.module.css";
import about1 from "@/assets/about-1.png";
import about2 from "@/assets/about-2.png";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

const MisionAndVision = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.section}>
          <div className={classes.imageContainer}>
            <SlideUp>
              <Image src={about1} alt="" />
            </SlideUp>
          </div>
          <div className={classes.details}>
            <div className={classes.heading}>
              <div className={classes.tag}>
                <SlideUp threshold={0.8}>OUR MISSION</SlideUp>
              </div>
              <div className={classes.title}>
                <SlideUp threshold={0.8}>Who we are</SlideUp>
              </div>
            </div>
            <div className={classes.description}>
              <SlideUp>
                Orki On-Ramp is dedicated to revolutionizing the onramp
                experience to cryptocurrencies. Our mission is to provide a
                secure, user-friendly, and inclusive platform, fostering
                financial accessibility and knowledge. Through innovative
                technology and a commitment to regulatory compliance, we strive
                to bridge the gap between traditional and digital finance,
                empowering users to seamlessly navigate the evolving landscape
                of cryptocurrencies with confidence and ease.
              </SlideUp>
            </div>
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.imageContainer}>
            <SlideUp>
              <Image src={about2} alt="" />
            </SlideUp>
          </div>
          <div className={classes.details}>
            <div className={classes.heading}>
              <div className={classes.tag}>
                <SlideUp threshold={0.8}>OUR VISION </SlideUp>
              </div>
              <div className={classes.title}>
                <SlideUp threshold={0.8}>Who we are</SlideUp>
              </div>
            </div>
            <div className={classes.description}>
              <SlideUp>
                Orki On-Ramp envisions a future where financial empowerment
                knows no bounds. We aspire to be at the forefront of pioneering
                onramp solutions that transcend barriers, making cryptocurrency
                accessible to everyone. Our vision is to lead in creating a
                seamless bridge between traditional and digital finance,
                fostering a global community that embraces the transformative
                potential of cryptocurrencies. By combining technological
                innovation with a commitment to security and education, we aim
                to be the catalyst for a more inclusive and interconnected
                financial landscape, where individuals can navigate and thrive
                in the world of digital assets with unparalleled ease.
              </SlideUp>
            </div>
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default MisionAndVision;
