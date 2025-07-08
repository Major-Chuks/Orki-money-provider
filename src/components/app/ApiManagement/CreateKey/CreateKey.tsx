import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./CreateKey.module.css";
import ModalContent from "@/components/Modal/ModalContent";
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import Select from "../Select/Select";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import backend from "@/services/apis";
import { toSentenceCase } from "@/services/utils";

const CreateKey = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [type, setType] = useState<"live" | "test">("test");
  const [keyName, setKeyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setIsLoading(true);
    const response = await backend().post_createApiKey({ type });
    if (response) {
      onSubmit();
    }
    setIsLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent
        stickyHeader
        title={"Create API Key"}
        subtitle="Create API Key"
        onClose={onClose}
      >
        <div className={classes.inputWrapper}>
          <CustomTextInput
            label="Key Name"
            value={keyName}
            placeholder="Enter key name"
            onChange={(e) => setKeyName(e.target.value)}
          />
          <Select
            label="Environment"
            additionalLabelInfo={
              type === "test" ? <div>No real transactions</div> : undefined
            }
            options={["test", "live"]}
            value={toSentenceCase(type)}
            onChange={(value) => {
              if (value === "live" || value === "test") setType(value);
            }}
          />
        </div>
        <div className={classes.btnWrapper}>
          <Button onClick={onClose} type="neutral" variant="outlined">
            Close
          </Button>
          <Button loading={isLoading} onClick={handleCreate}>
            Create API Key
          </Button>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default CreateKey;
