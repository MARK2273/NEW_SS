"use client";

import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import ButtonComponent from "@/components/common/ButtonComponent";
import CustomerInput from "@/components/common/CustomerInputComponent";
import ModalComponent from "@/components/common/ModalComponent";
import { addCustomer, customerT } from "@/store/customerSlice";
import { BasicFieldsT } from "@/types/basicInfoTypes";
import { RootState } from "@/store/store";
import customerSchema from "@/validators/customerSchema";
import { UnknownAction } from "@reduxjs/toolkit";

const customerInfoFields: BasicFieldsT[] = [
  { label: "Name", name: "customerName", type: "text" },
  { label: "Email", name: "customerEmail", type: "text" },
  { label: "Contact", name: "customerContact", type: "text" },
];

const AddCustomer: React.FC<{
  setIsModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsModal }:{ setIsModal: React.Dispatch<React.SetStateAction<boolean>>}):JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<customerT>({
    resolver: yupResolver(customerSchema),
  });

  const dispatch:Dispatch<UnknownAction> = useDispatch();
  const customers:customerT[] = useSelector(
    (state: RootState):customerT[] => state.customers.customers
  );

  const onSubmit:(data: customerT) => void = useCallback(
    (data: customerT):void => {
      const emailExists:boolean = customers.some(
        (customer:customerT):boolean => customer.customerEmail === data.customerEmail
      );

      if (emailExists) {
        setError("customerEmail", {
          type: "manual",
          message: "Email already exists",
        });
      } else {
        dispatch(addCustomer(data));
        setIsModal(false);
      }
    },
    [customers, dispatch, setError, setIsModal]
  );

  return (
    <ModalComponent setIsModal={setIsModal} label={"Add Customer"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col z-10 relative gap-5 p-5">
          {customerInfoFields.map((field:BasicFieldsT):JSX.Element => (
            <CustomerInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              register={register}
              errors={errors}
              customClass="w-full"
            />
          ))}
        </div>
        <div className="flex justify-end m-2">
          <ButtonComponent
            type="submit"
            label={"Proceed"}
            customClass={"mb-3 mr-1 text-green-500 border-green-500"}
          />
        </div>
      </form>
    </ModalComponent>
  );
};

AddCustomer.displayName = "AddCustomer";

export default React.memo(AddCustomer);
