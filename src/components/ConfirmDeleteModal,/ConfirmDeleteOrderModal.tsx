import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmDeleteOrderModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderName: string;
}

const ConfirmDeleteOrderModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, orderName }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          Delete Order
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <div className={styles.modalContent}>
          Are you sure you want to delete <b>{orderName}</b>?
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.deleteBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmDeleteOrderModal;
