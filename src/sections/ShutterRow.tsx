"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { AmountContext } from "@/contexts/AmountContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ButtonComponent from "@/components/common/ButtonComponent";
import SelectComponent from "@/components/common/SelectComponent";
import TextComponent from "@/components/common/TextComponent";
import { FormType } from "@/types/basicInfoTypes";

const ShutterNames: string[] = ["A", "B", "C"];

export default function ShutterRow({
  id,
  index,
  handleRemoveShutter,
  handleCloneShutter,
  register,
  errors,
  watch,
  setValue,
}: {
  id: string;
  index: number;
  handleRemoveShutter: (index: number) => void;
  handleCloneShutter: (index: number) => void;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
  setValue: UseFormSetValue<FormType>;
}) {
  const { setFinalAmount } = useContext(AmountContext) as {
    finalAmount: number;
    setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  const [area, setArea] = useState(0);
  const [width, setWidth] = useState(+watch(`shutter.${index}.width`));
  const [height, setHeight] = useState(+watch(`shutter.${index}.height`));

  useEffect(() => {
    setArea(width * height);
    setFinalAmount(
      (prev: number): number => prev + Number(width) * Number(height)
    );
  }, [height, width, setFinalAmount, index]);

  useEffect(() => {
    setValue(`shutter.${index}.area`, area);
  }, [area, index, setValue]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      key={id}
      className="flex gap-3 items-end"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <span
        {...listeners}
        className="cursor-move p-2 bg-gray-300 rounded"
        aria-label="Drag handle"
      >
        &#x2630; {/* Drag handle icon */}
      </span>
      <SelectComponent
        register={register}
        errors={errors}
        name={`shutter.${index}.shutterName`}
        label={"Shutter Name"}
        options={ShutterNames}
      />
      <TextComponent
        register={register}
        errors={errors}
        type="text"
        name={`shutter.${index}.width`}
        label="Width"
        handleChange={(e) => setWidth(+e.target.value)}
      />
      <TextComponent
        register={register}
        errors={errors}
        type="text"
        name={`shutter.${index}.height`}
        label="Height"
        handleChange={(e) => setHeight(+e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor={`shutter.${index}.area`}>Area</label>
        <input
          {...register(`shutter.${index}.area`)}
          disabled={true}
          value={area}
          className="border py-2 px-2 w-48 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>
      <ButtonComponent
        handleClick={() => handleRemoveShutter(index)}
        label={"Remove"}
        customClass={"mb-1 text-red-500 border-red-500"}
      />
      <ButtonComponent
        handleClick={() => handleCloneShutter(index)}
        label={"Clone"}
        customClass={"mb-1 text-blue-500 border-blue-500 "}
      />
    </div>
  );
}
