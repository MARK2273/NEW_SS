import * as yup from "yup";

const validationSchema = yup.object({
  basicInfo: yup.object({
    staffName: yup.string().trim().required("Staff Name is required."),
    customerName: yup.string().trim().required("Customer Name is required."),
    date: yup.string().required("Date is required."),
  }),
  shutter: yup
    .array()
    .of(
      yup.object({
        shutterName: yup.string().required("Shutter Name is required."),
        width: yup.string().required("Width is required."),
        height: yup.string().required("Height is required."),
        area: yup.number().positive("Area must be a positive.").required(),
      })
    )
    .min(1, "At least one row is required.")
    .required(),
  discountInfo: yup.object({
    discountType: yup.string().required("Discount Type is required."),
    discount: yup
      .number()
      .required("Discount is required.")
      .test(
        "is-valid-amount",
        "Discount cannot be greater than the final amount",
        function (value: number): boolean {
          if (this.parent.discountType === "amount") {
            return value <= this.options?.context?.finalAmount;
          }
          return true;
        }
      )
      .test(
        "is-valid-percentage",
        "Discount must be between 0 and 100.",
        function (value: number): boolean {
          if (this.parent.discountType === "percentage") {
            return value >= 0 && value <= 100;
          }
          return true;
        }
      ),
  }),
  totalAmount: yup.string().required(),
});

export default validationSchema;
