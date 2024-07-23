export type Inputs = {
  basicInfo: {
    staffName: string;
    customerName: string;
    date: Date;
  };
  shutterInfo: {
    shutterType: string;
  };
};

export type BasicFieldsT = {
  label: string;
  name: string;
  type: string;
};

export interface FormType {
  basicInfo: {
    staffName: string;
    customerName: string;
    date: string;
  };
  shutter: {
    shutterName: string;
    width: string;
    height: string;
    area: number;
  }[];
  discountInfo: {
    discountType: string;
    discount: number;
  };
  totalAmount: string;
}

export type NameT =
  | "discountInfo"
  | "discountInfo.discountType"
  | "discountInfo.discount"
  | "basicInfo"
  | "basicInfo.date"
  | "basicInfo.staffName"
  | "basicInfo.customerName"
  | "basicInfo.date"
  | "shutter"
  | `shutter.${number}.area`
  | `shutter.${number}.width`
  | `shutter.${number}.height`
  | `shutter.${number}.shutterName`
  | `shutter.${number}.area`
  | "finalAmount";
