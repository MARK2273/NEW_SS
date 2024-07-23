import { customerT } from "@/store/customerSlice";
import { FormData } from "@/store/formSlice";
import React, { ChangeEventHandler } from "react";
import { FieldErrors, FieldValue, FieldValues, UseFormRegister } from "react-hook-form";

type AddCustomerT = "customerName" | "customerEmail" | "customerContact";

export default function CustomerInput({
  label,
  name,
  type,
  handleChange,
  isDisabled = false,
  register,
  errors,
  customClass = "",
}: {
  label: string;
  name: any;
  type: string;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  isDisabled?: boolean;
  register: UseFormRegister<customerT>;
  errors: FieldErrors<FieldValues>;
  customClass?: string;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        onChange={handleChange}
        disabled={isDisabled}
        className={`border py-2 px-2 w-48 rounded-md focus:border-blue-500 focus:outline-none ${customClass}`}
      />
      <span className="text-red-500">{errors[name]?.message as string}</span>
    </div>
  );
}
