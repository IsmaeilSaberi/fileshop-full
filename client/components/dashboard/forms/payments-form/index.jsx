"use client";
import { useState, useEffect } from "react";
import AllPayments from "./all-payments";
import PaymentDetails from "./payment-details";
import NewUnviewedPayments from "./all-payments/new-unviewed-payments";

const PaymentsMain = () => {
  const [paymentDetailCtrl, setPaymentDetailCtrl] = useState("");
  const [randNumForPaymentClick, setRandNumForPaymentClick] = useState(1);
  const [details, setDetails] = useState(
    <AllPayments
      setRandNumForPaymentClick={setRandNumForPaymentClick}
      setPaymentDetailCtrl={setPaymentDetailCtrl}
    />
  );

  useEffect(() => {
    if (paymentDetailCtrl != "") {
      setDetails(<PaymentDetails paymentId={paymentDetailCtrl} />);
    }
  }, [randNumForPaymentClick]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">سفارش ها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllPayments
                  setRandNumForPaymentClick={setRandNumForPaymentClick}
                  setPaymentDetailCtrl={setPaymentDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() =>
              setDetails(
                <NewUnviewedPayments
                  setRandNumForPaymentClick={setRandNumForPaymentClick}
                  setPaymentDetailCtrl={setPaymentDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            سفارش های جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default PaymentsMain;
