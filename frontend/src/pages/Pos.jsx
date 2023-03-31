import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

import { Header, Button } from "../components";
import InvoiceForm from "./invoice/InvoiceForm";

const Pos = () => {
  const { currentColor } = useStateContext();

  return (
    <>

      <div className=" flex flex-wrap justify-center gap-1">
        <div className=" m-2 w-[90%] rounded-2xl rounded-2xl bg-white p-2 dark:bg-gray-700 dark:text-gray-200 md:pl-5 pr-5 pt-2 pb-2">
        <div className="mt-14 ml-3 sm:ml-3 sm:mt-5 ">
        <Header category="Halaman" title="POS" />
      </div>
          <InvoiceForm />
        </div>
      </div>
    </>
  );
};

export default Pos;
