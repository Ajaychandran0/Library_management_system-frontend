import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { create } from "zustand";

const useConfirmDialogStore = create(set => ({
  message: "",
  title: "",
  onConfirm: undefined,
  onCancel: () => set({ onConfirm: undefined }),
}));

export const confirmDialog = ({ message, title, onConfirm }) => {
  useConfirmDialogStore.setState({ message, title, onConfirm });
};

const ConfirmDialog = () => {
  const { message, title, onConfirm, onCancel } = useConfirmDialogStore();
  return (
    <Dialog
      open={Boolean(onConfirm)}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm();
            onCancel();
          }}
          color="error"
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
