import H1 from "@/components/Typography/H1/H1";
import classes from "./Visualize.module.css";
import Responsive from "@/components/Responsive/Responsive";

const data = [
  {
    id: 1,
    description:
      "Utilizing Orki’s Onramp Orchestrator Layer for streamlined integration of various onramps, creating a seamless connection to multiple cryptocurrency networks and exchanges.",
  },
  {
    id: 2,
    description:
      "Orki’s Orchestration layer compiles data from diverse onramps, assessing key factors like KYC requirements, transaction fees, payment methods, and speed. By weighing these parameters, it intelligently directs users to the most suitable onramp for their needs, ensuring seamless and efficient transactions every time.",
  },
  {
    id: 3,
    description:
      "Orki offers a dynamic duo – a versatile Widget and a flexible API designed for businesses. Tailor these tools to your brand's unique style and offer your customers the ultimate user experience. Whether they're purchasing assets or diving into new opportunities, it's the seamless solution for stress-free onboarding.",
  },
];

const Visualize = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <H1 style={{ textAlign: "center" }}>
              Visualize the Onramp Orchestration Layer{" "}
            </H1>
          </div>
          <div className={classes.image}></div>
          <div className={classes.listContainer}>
            {data.map(({ id, description }, idx) => (
              <div key={idx} className={classes.box}>
                <div className={classes.id}>{id}</div>
                <div className={classes.description}>{description}</div>
              </div>
            ))}
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Visualize;
