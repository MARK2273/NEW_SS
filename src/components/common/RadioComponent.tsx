import { FormType } from "@/types/basicInfoTypes";
import React, { ChangeEventHandler } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import _ from "lodash"

type OptionT = {
  name: any;
  label: string;
  value: string;
};

export type DiscountInfoErrors = {
  discountType?: {
    message?: string;
  };
};

export type FormErrors = {
  discountInfo?: DiscountInfoErrors;
};

export default function RadioComponent({
  options,
  label,
  handleChange,
  register,
  errors,
}: {
  options: OptionT[];
  label: string;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FieldValues>;
}):JSX.Element {
  const formErrors = errors as FormErrors;


  return (
    <div className="flex gap-5 items-center">
      <label>{label}</label>
      {options.map((option: OptionT, index: number):JSX.Element => {
        return (
          <div key={index} className="flex gap-2">
            <input
              type="radio"
              id={option.name + index}
              {...register(option.name)}
              value={option.value}
              onChange={handleChange}
            />
            <label htmlFor={option.name + index}>{option.label}</label>
          </div>
        );
      })}
      {formErrors.discountInfo?.discountType && (
        <span className="text-red-500">
          {formErrors.discountInfo?.discountType.message as string}
        </span>
      )}
    </div>
  );
}
