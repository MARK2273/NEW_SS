"use client";

import RadioComponent from "@/components/common/RadioComponent";
import TextComponent from "@/components/common/TextComponent";
import { AmountContext } from "@/contexts/AmountContext";
import { FormType } from "@/types/basicInfoTypes";
import React, { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

const Radio_Options: {
  name: string;
  label: string;
  value: string;
}[] = [
  { name: "discountInfo.discountType", label: "Amount", value: "amount" },
  {
    name: "discountInfo.discountType",
    label: "Percentage",
    value: "percentage",
  },
];

const DiscountSection: React.FC<{
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
}> = ({ register, errors, watch }) => {
  const { finalAmount } = useContext(AmountContext) as { finalAmount: number };

  const [discount, setDiscount] = useState(watch("discountInfo.discount"));
  const [discountType, setDiscountType] = useState("amount");
  const[discountedAmount , setDiscountedAmount] = useState(0)

  const handleDiscountTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiscountType(e.target.value);
    },
    []
  );

  const handleDiscountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiscount(+e.target.value);
    },
    []
  );
  console.log(discount,"...");
  console.log(finalAmount, "___");

  const payableAmount = () => {
    if (discount > 0 && discount <= finalAmount) {
      return discountType === "amount"
        ? finalAmount - discount
        : finalAmount - (finalAmount * discount) / 100;
    }
    return finalAmount;
  };

  useEffect(()=> {
    console.log(payableAmount() , "sdhvj");
    setDiscountedAmount(payableAmount())
    console.log(discountedAmount,"discountedAmount");
  }, [finalAmount,discount])


  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Discount Information</h2>
      <div className="flex flex-col gap-3">
        <RadioComponent
          register={register}
          errors={errors}
          options={Radio_Options}
          label={"Discount Type"}
          handleChange={handleDiscountTypeChange}
        />
        <TextComponent
          register={register}
          errors={errors}
          label={"Discount"}
          name={"discountInfo.discount"}
          type={"text"}
          handleChange={handleDiscountChange}
        />
        <p>Payable Amount: {discountedAmount}</p>
      </div>
    </div>
  );
};

DiscountSection.displayName = "DiscountSection";

export default React.memo(DiscountSection);
