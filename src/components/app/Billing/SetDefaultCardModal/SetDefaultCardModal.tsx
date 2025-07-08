import ModalContent from "@/components/Modal/ModalContent";
import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./SetDefaultCardModal.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";

const SetDefaultCardModal = ({
  onClose,
  cardId,
}: {
  onClose: () => void;
  cardId: string;
}) => {
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const setDefaultCard = async () => {
    setLoading(true);
    const response = await backend().patch_updatePaymentMethod({ id: cardId });

    if (response) {
      showToast("Default card updated successfully", "success");
      onClose();
    }
    setLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent
        stickyHeader
        title="Set Default Payment Method"
        onClose={onClose}
      >
        <div className={classes.container}>
          <div className={classes.text}>
            By setting this payment method as default, it will be used for all
            future charges and subscription renewals. Do you agree to proceed?
          </div>
          <div className={classes.btnWrapper}>
            <Button onClick={onClose} variant="outlined" type="neutral">
              Cancel
            </Button>
            <Button loading={loading} onClick={setDefaultCard}>
              Set as Default
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default SetDefaultCardModal;
