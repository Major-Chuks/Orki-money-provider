import Responsive from "@/components/Responsive/Responsive";
import classes from "./Form.module.css";
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";

const Form = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.details}>
          <div className={classes.title}>
            <SlideUp>Excited to join the journey?</SlideUp>
          </div>
          <div className={classes.description}>
            <SlideUp>
              Be the first in line to experience effortless offramping!
            </SlideUp>
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <SlideUp>
            <CustomTextInput
              required
              label="Name"
              placeholder="Enter your name"
            />
          </SlideUp>
          <SlideUp>
            <CustomTextInput
              required
              label="Email "
              placeholder="Enter your email"
            />
          </SlideUp>
          <SlideUp>
            <CustomTextInput
              label="Company Name "
              placeholder="Enter your company name"
            />
          </SlideUp>
          <div className={classes.btnContainer}>
            <SlideUp>
              <CustomButton style={{ width: "max-content" }}>
                Join the waitist
              </CustomButton>
            </SlideUp>
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default Form;
