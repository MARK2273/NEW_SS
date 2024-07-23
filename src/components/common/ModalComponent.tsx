import React, { Dispatch, SetStateAction } from "react";
import ButtonComponent from "./ButtonComponent";

export default function ModalComponent({
  label,
  children,
  setIsModal,
}: {
  label: string;
  children: JSX.Element;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}):JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-4 max-w-sm w-full">
        <div className="bg-slate-100 rounded-lg shadow">
          <div className="flex justify-end">
            <div className="bg-red 100 mr-auto w-full grid grid-cols-2 ">
              <p className="flex justify-center items-center">{label}</p>
              <div className="flex justify-end">
                <ButtonComponent
                  label="X"
                  customClass="border-2 border-slate-300 hover:bg-red-500 hover:border-red-500 hover:text-white m-2 mr-3 w-12 font-semibold"
                  handleClick={():void => setIsModal(false)}
                />
              </div>
            </div>
          </div>
          <div className="border border-grey-200"></div>
          {children}
        </div>
      </div>
    </div>
  );
}
