import ModalContent from "@/components/Modal/ModalContent";
import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./DeletePaymentCardModal.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";

const DeletePaymentCardModal = ({
  onClose,
  cardId,
}: {
  onClose: () => void;
  cardId: string;
}) => {
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const deleteCard = async () => {
    setLoading(true);
    const response = await backend().delete_deletePaymentMethod({ id: cardId });

    if (response) {
      showToast("Card deleted successfully", "success");
      onClose();
    }
    setLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent
        stickyHeader
        title="Delete Payment Method"
        onClose={onClose}
      >
        <div className={classes.container}>
          <div className={classes.text}>
            Are you sure you want to delete this payment method? This action
            cannot be undone.
          </div>
          <div className={classes.btnWrapper}>
            <Button onClick={onClose} variant="outlined" type="neutral">
              Cancel
            </Button>
            <Button type="danger" loading={loading} onClick={deleteCard}>
              Delete
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default DeletePaymentCardModal;
