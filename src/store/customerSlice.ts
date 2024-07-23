// store/customerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type customerT  = {
  customerName: string;
  customerEmail: string;
  customerContact: string;
};

type CustomerState = {
  customers: customerT[];
};

const initialState: CustomerState = {
  customers: [
    {
      customerName: "Ayush",
      customerEmail: "ayush@gmail.com",
      customerContact: "4545454545",
    },
  ],
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer(state, action: PayloadAction<customerT>) {
      state.customers.push(action.payload);
    },
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
