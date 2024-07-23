"use client";

import { AmountProvider } from "@/contexts/AmountContext";
import ShutterForm from "@/components/ShutterForm";
import store from "@/store/store";
import { Provider } from "react-redux";
import { Suspense } from "react";

export default function page(): JSX.Element {
  return (
    <div className="w-full p-5">
      <Provider store={store}>
        <AmountProvider>
          <Suspense>
            <ShutterForm />
          </Suspense>
        </AmountProvider>
      </Provider>
    </div>
  );
}
