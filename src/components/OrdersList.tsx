"use client"

import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { FormData, Shutter, deleteFormData } from "@/store/formSlice";
import Link from "next/link";
import { shallowEqual } from "react-redux";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const OrderListPage: React.FC = ():JSX.Element => {
  const [isModal, setIsModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const formDataArray:FormData[] = useSelector(
    (state: RootState):FormData[] => state.form,
    shallowEqual
  );
  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const handleDelete= useCallback((index: number) => {
    setDeleteIndex(index);
    setIsModal(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteIndex !== null) {
      dispatch(deleteFormData(deleteIndex));
    }
  }, [dispatch, deleteIndex]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {formDataArray.length > 0 ? (
        <table className=" bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Staff Name</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Discount Type</th>
              <th className="py-2 px-4 border-b">Discount</th>
              <th className="py-2 px-4 border-b">Payable Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formDataArray.map((formData:FormData, index:number):JSX.Element => {
              const totalPrice:number = formData.shutter.reduce(
                (sum:number, shutter:Shutter):number => sum + shutter.area,
                0
              );
              const discountAmount:number =
                formData.discountInfo.discountType === "percentage"
                  ? (totalPrice * Number(formData.discountInfo.discount)) / 100
                  : Number(formData.discountInfo.discount);
              const payablePrice:number = totalPrice - discountAmount;

              return (
                <tr key={index} className="">
                  <td className="py-2 px-4 border-b">
                    {formData.basicInfo.customerName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formData.basicInfo.staffName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formData.basicInfo.date}
                  </td>
                  <td className="py-2 px-4 border-b">{totalPrice}</td>
                  <td className="py-2 px-4 border-b capitalize">
                    {formData.discountInfo.discountType}
                  </td>
                  <td className="py-2 px-4 border-b">{discountAmount}</td>
                  <td className="py-2 px-4 border-b">{payablePrice}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <Link href={`/?id=${index}`}>
                      <button className="bg-blue-500 text-white py-1 px-3 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No data available.</div>
      )}

      {isModal && (
        <ConfirmationModal
          label=""
          message="Are you sure you want to delete this order?"
          onConfirm={confirmDelete}
          onCancel={() => setIsModal(false)}
          setIsModal={setIsModal}
        />
      )}
    </div>
  );
};

OrderListPage.displayName = "OrderListPage";

export default React.memo(OrderListPage);
