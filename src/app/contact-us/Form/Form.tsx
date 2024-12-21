/* eslint-disable react/no-unescaped-entities */
import classes from "./Form.module.css";
import Image from "next/image";
import teamImage from "@/assets/contactUs/team.png";
import CustomCheckbox from "@/components/CustomInput/CustomCheckbox/CustomCheckbox";
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import {
  ErrorState,
  InputIdState,
  InputState,
  resetValidation,
  validateInput,
} from "@/components/CustomInput/CustomInput.script";
import { useEffect, useState } from "react";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import envelopIcon from "@/assets/icon-envelop.png";
import Responsive from "@/components/Responsive/Responsive";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";

const Form = () => {
  const [error, setError] = useState<ErrorState>({
    name: false,
    email: false,
    support: false,
    message: false,
    confirm: false,
  });

  const [input, setInput] = useState<InputState>({
    name: "",
    message: "",
    support: "",
    email: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: InputIdState
  ) => {
    if (id) {
      resetValidation({ id, error, setError });
      setInput((i) => ({ ...i, [id]: event.target.value }));
    }
  };

  const handleCheckbox = () => {
    setIsChecked((c) => {
      setInput((i) => ({ ...i, ["confirm"]: c ? "" : "true" }));
      return !c;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 1000);
    });
    setLoading(false);
    setSubmitted(true);
  };

  useEffect(() => {
    const isValid = validateInput({ input: input, setError: () => {} });
    if (isValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input]);

  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.heading}>
            <div className={classes.title}>
              <SlideUp>
                Contact our <br />
                Support Team
              </SlideUp>
            </div>
            <div className={classes.description}>
              <SlideUp>
                Have questions about Orki? Fill out the form and our sales
                expert will be in touch directly
              </SlideUp>
            </div>
          </div>
          <div className={classes.imageContainer}>
            <SlideUp>
              <Image src={teamImage} alt="" />
            </SlideUp>
          </div>
        </div>
        <>
          {!submitted ? (
            <div className={classes.rightSide}>
              <div className={classes.inputContainer}>
                <SlideUp>
                  <CustomTextInput
                    id={"name"}
                    label="Company Name"
                    placeholder="Enter Company Name"
                    onChange={handleChange}
                    value={input}
                    error={error}
                    errorMsg=""
                    outline={false}
                  />
                </SlideUp>
              </div>

              <div className={classes.inputContainer}>
                <SlideUp>
                  <CustomEmailInput
                    id={"email"}
                    label="Work Email"
                    placeholder="Enter Company Email"
                    onChange={handleChange}
                    value={input}
                    error={error}
                    errorMsg=""
                    outline={false}
                  />
                </SlideUp>
              </div>

              <div className={classes.inputContainer}>
                <SlideUp>
                  <CustomTextInput
                    id={"support"}
                    label="How can our team help?"
                    placeholder="Enter a subject"
                    onChange={handleChange}
                    value={input}
                    error={error}
                    errorMsg=""
                    outline={false}
                  />
                </SlideUp>
              </div>

              <div className={classes.inputContainer}>
                <SlideUp>
                  <CustomTextInput
                    id={"message"}
                    label="Write Message"
                    placeholder="Write us a message"
                    onChange={handleChange}
                    value={input}
                    error={error}
                    errorMsg=""
                    outline={false}
                    type="textarea"
                  />
                </SlideUp>
              </div>

              <div className={classes.terms}>
                <SlideUp>
                  <CustomCheckbox
                    isChecked={isChecked}
                    value=""
                    onChange={handleCheckbox}
                  />
                </SlideUp>
                <div>
                  <SlideUp>
                    By submitting this form, i confirm that I have read and
                    understood orki's <a href="">Privacy Statement.</a>
                  </SlideUp>
                </div>
              </div>

              <div className={classes.btnContainer}>
                <SlideUp>
                  <CustomButton
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={disabled}
                  >
                    Submit
                  </CustomButton>
                </SlideUp>
              </div>
            </div>
          ) : (
            <div className={`${classes.rightSide} ${classes.submission}`}>
              <SlideUp>
                <Image src={envelopIcon} alt="" />
              </SlideUp>

              <div className={classes.title}>
                <SlideUp>Thanks for your message</SlideUp>
              </div>

              <div className={classes.description}>
                <SlideUp>
                  Someone from the team will be in touch shortly.
                </SlideUp>
              </div>
            </div>
          )}
        </>
      </div>
    </Responsive>
  );
};

export default Form;
