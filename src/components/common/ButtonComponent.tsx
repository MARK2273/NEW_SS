import React from "react";

export default function ButtonComponent({
  handleClick,
  label,
  customClass,
  type = "button",
}: {
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  customClass?: string;
  type?: "button" | "submit" | "reset" | undefined;
}):JSX.Element {
  return (
    <button
      type={type}
      className={`border w-24 p-1 rounded-md ${customClass}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
