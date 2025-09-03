import classes from "./DeleteModal.module.css";
import { useState } from "react";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import Button from "@/components/CustomInput/Button/Button";
import { get_listManagementTeam } from "@/types/apis/teamManagement/get_listManagementTeam";
import ModalLayout from "@/components/Modal/ModalLayout";
import ModalContent from "@/components/Modal/ModalContent";

const DeleteModal = ({
  onClose,
  member,
}: {
  onClose: (reload?: boolean) => void;
  member: get_listManagementTeam["data"][number];
}) => {
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    const response = await backend().delete_removeTeamMember({
      id: member.id,
    });
    if (response) {
      showToast("Deleted successfully", "success");
    }
    onClose(true);
    setLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent title="Delete Team Member" onClose={onClose}>
        <div className={classes.container}>
          <div className={classes.text}>
            Are you sure you want to delete this this team member? This action
            cannot be undone.
          </div>
          <div className={classes.btnWrapper}>
            <Button variant="outlined" type="neutral" onClick={onClose}>
              Cancel
            </Button>
            <Button type="danger" onClick={handleDelete} loading={loading}>
              Delete
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default DeleteModal;
