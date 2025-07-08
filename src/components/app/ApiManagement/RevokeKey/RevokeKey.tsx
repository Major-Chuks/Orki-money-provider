import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./RevokeKey.module.css";
import ModalContent from "@/components/Modal/ModalContent";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import backend from "@/services/apis";
import { formatText } from "@/services/utils";

const RevokeKey = ({
  apiKeyId,
  type,
  onClose,
  onSubmit,
}: {
  apiKeyId: string;
  type: string;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setIsLoading(true);
    const response = await backend().delete_apiKey({ apiKeyId });
    if (response) {
      onSubmit();
    }
    setIsLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent stickyHeader title={"Revoke API Key"} onClose={onClose}>
        <div className={classes.info}>
          Are you sure you want to revoke &quot;{formatText(type)} API
          Key&quot;? This action cannot be undone and will immediately stop all
          requests using this key.
        </div>
        <div className={classes.btnWrapper}>
          <Button onClick={onClose} type="neutral" variant="outlined">
            Close
          </Button>
          <Button type="danger" loading={isLoading} onClick={handleCreate}>
            Revoke Key
          </Button>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default RevokeKey;
