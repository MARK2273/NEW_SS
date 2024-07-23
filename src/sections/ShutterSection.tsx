"use client";

import React, { useContext, useEffect, useCallback } from "react";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import { AmountContext } from "@/contexts/AmountContext";
import ShutterRow from "./ShutterRow";
import ButtonComponent from "@/components/common/ButtonComponent";
import { FormType } from "@/types/basicInfoTypes";
import TextComponent from "@/components/common/TextComponent";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ShutterListT = ShutterT[];

export type ShutterT = {
  shutterName: string;
  width: string;
  height: string;
  area: number;
};

const ShutterSection = ({
  register,
  errors,
  watch,
  setValue,
  control,
  getValues,
}: {
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
  setValue: UseFormSetValue<FormType>;
  control: Control<FormType, any>;
  getValues: UseFormGetValues<FormType>;
}): JSX.Element => {
  const { finalAmount, setFinalAmount } = useContext(AmountContext) as {
    finalAmount: number;
    setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  const {
    fields: shutterFields,
    append: appendShutter,
    remove: removeShutter,
    insert: insertShutter,
    move: moveShutter,
  } = useFieldArray({
    control,
    name: "shutter",
  });

  const shutterList: ShutterListT = watch("shutter");

  useEffect(() => {
    let total: number = 0;
    shutterList &&
      shutterList.map((shutter: ShutterT) => {
        total += shutter.area;
      });
    setFinalAmount(total);
    setValue("totalAmount", total.toString());
  }, [finalAmount]);

  const handleAddShutter = useCallback(() => {
    appendShutter({
      shutterName: "",
      width: "",
      height: "",
      area: 0,
    });
  }, [appendShutter]);

  const handleRemoveShutter = useCallback(
    (index: number) => {
      removeShutter(index);
    },
    [removeShutter]
  );

  const handleCloneShutter = useCallback(
    (index: number) => {
      insertShutter(index, {
        shutterName: watch(`shutter.${index}.shutterName`),
        width: watch(`shutter.${index}.width`),
        height: watch(`shutter.${index}.height`),
        area: watch(`shutter.${index}.area`),
      });
    },
    [insertShutter, watch]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = shutterFields.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = shutterFields.findIndex((item) => item.id === over.id);
        moveShutter(oldIndex, newIndex);
      }
    },
    [moveShutter, shutterFields]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={shutterFields.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Shutter Information</h2>
          <div className="flex flex-col gap-3">
            {shutterFields.map((field, index) => (
              <ShutterRow
                key={field.id}
                id={field.id}
                watch={watch}
                setValue={setValue}
                register={register}
                errors={errors}
                index={index}
                handleRemoveShutter={handleRemoveShutter}
                handleCloneShutter={handleCloneShutter}
              />
            ))}
            <div className="flex flex-col gap-3">
              <ButtonComponent
                handleClick={handleAddShutter}
                label={"Add Shutter"}
                customClass={" w-36 text-blue-500 border-blue-500"}
              />
              <TextComponent
                register={register}
                errors={errors}
                label={"Final Amount"}
                name={"totalAmount"}
                type={"text"}
                isDisabled={true}
              />
            </div>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default React.memo(ShutterSection);
