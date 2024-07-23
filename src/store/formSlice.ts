import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Shutter {
  shutterName: string;
  width: string;
  height: string;
  area: number;
}

interface DiscountInfo {
  discountType: string;
  discount: number;
}

interface BasicInfo {
  staffName: string;
  customerName: string;
  date: string;
}

export interface FormData {
  discountInfo: DiscountInfo;
  basicInfo: BasicInfo;
  shutter: Shutter[];
  totalAmount: string;
}

const initialState: FormData[] = [
  {
    basicInfo: {
      staffName: "ayush",
      customerName: "Ayush",
      date: "2024-07-07",
    },
    shutter: [
      {
        shutterName: "A",
        width: "20",
        height: "30",
        area: 600,
      },
    ],
    discountInfo: {
      discountType: "amount",
      discount: 0,
    },
    totalAmount: "600",
  },
];

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
    deleteFormData: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    editFormData: (
      state,
      action: PayloadAction<{ index: number; data: FormData }>
    ) => {
      state[action.payload.index] = action.payload.data;
    },
  },
});

export const { addFormData, deleteFormData, editFormData } = formSlice.actions;
export default formSlice.reducer;
