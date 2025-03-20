import { formatCurrency } from "@/lib/utils";

const OrderTotalDetails = ({
  values,
}: {
  values: {
    itemsPrice: string;
    taxPrice: string;
    shippingPrice: string;
    totalPrice: string;
  };
}) => {
  return (
    <>
      <div className="flex justify-between">
        <div>Items</div>
        <div>{formatCurrency(values.itemsPrice)}</div>
      </div>
      <div className="flex justify-between">
        <div>Tax</div>
        <div>{formatCurrency(values.taxPrice)}</div>
      </div>
      <div className="flex justify-between">
        <div>Shipping</div>
        <div>{formatCurrency(values.shippingPrice)}</div>
      </div>
      <div className="flex justify-between">
        <div>Total</div>
        <div>{formatCurrency(values.totalPrice)}</div>
      </div>
    </>
  );
};

export default OrderTotalDetails;
