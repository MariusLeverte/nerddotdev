import "react-responsive-modal/styles.css";
import { Modal as RRModal } from "react-responsive-modal";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ open, onClose, children }: Props) => {
  return (
    <RRModal open={open} onClose={onClose} center>
      {children}
    </RRModal>
  );
};

export default Modal;
