import Responsive from "@/components/Responsive/Responsive";
import classes from "./Form.module.css";
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import Button from "@/components/Button/Button";

const Form = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.details}>
          <div className={classes.title}>Excited to join the journey?</div>
          <div className={classes.description}>
            Be the first in line to experience effortless offramping!
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <CustomTextInput label="Name *" placeholder="Enter your name" />
          <CustomTextInput label="Email * " placeholder="Enter your email" />
          <CustomTextInput
            label="Company Name "
            placeholder="Enter your company name"
          />
          <div className={classes.btnContainer}>
            <Button>Join the waitist</Button>
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default Form;
