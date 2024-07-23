"use client";

import React from "react";
import Link from "next/link";

export default function NavBar():JSX.Element {
  return (
    <div className="flex gap-5 ">
      <Link href="/">Shutter Form</Link>
      <Link href="/list">Customers List</Link>
    </div>
  );
}
