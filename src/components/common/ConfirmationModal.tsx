// components/ConfirmationModal.tsx

import React from "react";
import ButtonComponent from "./ButtonComponent";
import ModalComponent from "./ModalComponent";

interface ConfirmationModalProps {
  label: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
  setIsModal,
  label,
}:ConfirmationModalProps):JSX.Element => {
  return (
    <ModalComponent setIsModal={setIsModal} label={label}>
      <div className="p-4">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <ButtonComponent
            label="Cancel"
            customClass="bg-gray-500 text-white border-gray-500"
            handleClick={():void => setIsModal(false)}
          />
          <ButtonComponent
            label="Confirm"
            customClass="bg-red-500 text-white border-red-500"
            handleClick={():void => {
              onConfirm();
              setIsModal(false);
            }}
          />
        </div>
      </div>
    </ModalComponent>
  );
};

export default ConfirmationModal;
