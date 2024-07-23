import { FormType, NameT } from "@/types/basicInfoTypes";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import _ from "lodash";
import { FormErrors } from "./TextComponent";



interface SelectComponentProps {
  name: any;
  label: string;
  options: string[];
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FieldValues>;
}

export default function SelectComponent({
  name,
  label,
  options,
  register,
  errors,
}: SelectComponentProps):JSX.Element {
  const formErrors = errors as FormErrors;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        {...register(name, { required: `${label} is required` })}
        className={`border py-2 px-2 w-50 rounded-md focus:border-blue-500 focus:outline-none bg-white ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option: string):JSX.Element => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-red-500">
        {_.get(formErrors, `${name}.message`) as string}
      </span>
    </div>
  );
}
