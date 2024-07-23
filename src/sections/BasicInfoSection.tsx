"use client";

import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useSelector } from "react-redux";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import TextComponent from "@/components/common/TextComponent";
import ButtonComponent from "@/components/common/ButtonComponent";
import SelectComponent from "@/components/common/SelectComponent";
import { RootState } from "@/store/store";
import { customerT } from "@/store/customerSlice";
import { BasicFieldsT, FormType } from "@/types/basicInfoTypes";

const BasicInfoFields: BasicFieldsT[] = [
  {
    label: "Staff Name",
    name: "basicInfo.staffName",
    type: "text",
  },
  {
    label: "Customer Name",
    name: "basicInfo.customerName",
    type: "select",
  },
  {
    label: "Date",
    name: "basicInfo.date",
    type: "date",
  },
];

const BasicInfoSection = React.memo(
  ({
    register,
    errors,
    setIsModal,
  }: {
    register: UseFormRegister<FormType>;
    errors: FieldErrors<FormType>;
    setIsModal: Dispatch<SetStateAction<boolean>>;
  }): JSX.Element => {
    const customers: customerT[] = useSelector(
      (state: RootState): customerT[] => state.customers.customers
    );

    const customerNames:string[] = React.useMemo(
      ():string[] => customers.map((customer:customerT):string => customer.customerName),
      [customers]
    );

    const handleAddCustomerClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault();
        setIsModal(true);
      },
      [setIsModal]
    );

    return (
      <div className="">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <div className=" flex gap-5">
          {BasicInfoFields.map((field: BasicFieldsT, index: number):JSX.Element => {
            if (field.type === "select") {
              return (
                <SelectComponent
                  register={register}
                  errors={errors}
                  key={index}
                  label={field.label}
                  name={field.name}
                  options={customerNames}
                />
              );
            } else {
              return (
                <TextComponent
                  register={register}
                  errors={errors}
                  key={index}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                />
              );
            }
          })}
          <div className="flex items-end">
            <ButtonComponent
              handleClick={handleAddCustomerClick}
              label={"Add New Customer"}
              customClass={" w-40 text-blue-500 border-blue-500 py-2"}
            />
          </div>
        </div>
      </div>
    );
  }
);

BasicInfoSection.displayName = "BasicInfoSection";

export default BasicInfoSection;
