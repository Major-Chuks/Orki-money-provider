import classes from "./ValueAndCulture.module.css";
import icon1 from "@/assets/career-1.svg";
import icon2 from "@/assets/career-2.svg";
import icon3 from "@/assets/career-3.svg";
import icon4 from "@/assets/career-4.svg";
import icon5 from "@/assets/career-5.svg";
import icon6 from "@/assets/career-6.svg";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const data = [
  {
    icon: icon1,
    title: "Competitive Package",
    description:
      "Our competitive package goes beyond just salary; it reflects our commitment to acknowledging the value each team member brings to our innovative journey. Join us, and experience a package that aligns with your skills and contributions, ensuring that your dedication is met with tangible appreciation.",
  },
  {
    icon: icon2,
    title: "Remote Work Setting",
    description:
      "Orki embraces the future of work with a remote-friendly environment. We understand the importance of flexibility and work-life balance. Whether you thrive in the comfort of your home or desire a change of scenery, our remote work setting empowers you to contribute your best, wherever you are in the world.",
  },
  {
    icon: icon3,
    title: "Private Healthcare",
    description:
      "Your well-being is our priority at Orki. Our commitment to your health extends beyond the workplace. Enjoy the peace of mind that comes with our comprehensive private healthcare coverage, ensuring you and your loved ones have access to quality medical care when you need it most.",
  },
  {
    icon: icon4,
    title: "Personal Growth",
    description:
      "Orki is not just a workplace; it's a launchpad for personal growth. We foster an environment that encourages continuous learning and development. From mentorship programs to professional development resources, we invest in your growth, empowering you to thrive in your career and beyond.",
  },
  {
    icon: icon5,
    title: "Latest Gadgets",
    description:
      "Stay ahead in the tech game with Orki. As part of our team, you'll have access to the latest gadgets and tools that empower you to innovate and excel. We believe that providing the right technology enhances creativity and efficiency, ensuring you have the tools you need to bring your best ideas to life.",
  },
  {
    icon: icon6,
    title: "Gym Pass",
    description:
      "Orki believes in a holistic approach to well-being. Our gym pass benefit encourages a healthy lifestyle, supporting your physical and mental fitness goals. Whether you prefer pumping iron, attending classes, or simply going for a run, our gym pass ensures you have the flexibility to stay active and energized.",
  },
];

const ValueAndCulture = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.accent}>Life at Orki </div>
          <div className={classes.title}>Our team values and Culture</div>
        </div>

        <div className={classes.listContainer}>
          {data.map(({ icon, title, description }, idx) => (
            <div key={idx} className={classes.box}>
              <div className={classes.iconContainer}>
                <Image src={icon} alt="" />
              </div>
              <div className={classes.title}>{title}</div>
              <div className={classes.description}>{description}</div>
            </div>
          ))}
        </div>
      </div>
    </Responsive>
  );
};

export default ValueAndCulture;
