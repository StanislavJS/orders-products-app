import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmDeleteModal.module.css';
import { FaDesktop, FaLaptop, FaMobileAlt, FaBoxOpen } from 'react-icons/fa';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  serialNumber: string;
  productType?: string;
}

// Функция выбора иконки по типу продукта
const getIconByType = (type?: string) => {
  switch (type?.toLowerCase()) {
    case 'monitor':
      return <FaDesktop size={48} color="#444" />;
    case 'laptop':
      return <FaLaptop size={48} color="#444" />;
    case 'phone':
      return <FaMobileAlt size={48} color="#444" />;
    default:
      return <FaBoxOpen size={48} color="#444" />;
  }
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  serialNumber,
  productType,
}) => {
  if (!isOpen) return null;

  const productIcon = getIconByType(productType);

  // Закрытие при клике на оверлей
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.modalHeader} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {productIcon}
            <span id="modal-title">Are you sure you want to delete this product?</span>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">&times;</button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.statusDot}></div>
          {productIcon}
          <div className={styles.info}>
            <div className={styles.name}>{productName}</div>
            <div className={styles.serial}>{serialNumber}</div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>
            CANCEL
          </button>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            DELETE
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmDeleteModal;
