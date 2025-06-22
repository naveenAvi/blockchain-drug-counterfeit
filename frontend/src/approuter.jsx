import React from "react";
// eslint-disable-next-line no-unused-vars

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componentsd/pages/login";
import CreateDrugLot from "./componentsd/CreateDrugLot/CreateDrugLot";
import CreateInvoice from "./componentsd/PurchaseRequests/CreateInvoice";
import PPInvoiceList from "./componentsd/PurchaseRequests/InvoiceList";
import AddNewDrug from "./CommonPages/DrugInventory/AddNewDrug";
import DrugInventory from "./CommonPages/DrugInventory/DrugInventory";
import PosScreen from "./CommonPages/Pos/PosScreen";
import AddManufacturer from "./CommonPages/ConnectedParties/AddManufacturer";
import AddImporters from "./CommonPages/ConnectedParties/AddImporters";
import CreateOrder from "./CommonPages/Transactions/CreateOrder";
import OrderList from "./CommonPages/Approvals/OrderList";
import OrderInvoice from "./CommonPages/Approvals/OrderInvoice";

//Accounts
const Approuter = () => {
  // eslint-disable-next-line no-unused-vars
  // const config = "/react/template"
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
         
          <Route path="/create-drug" element={<AddNewDrug />} />
          <Route path="/create-manufacturer" element={<AddManufacturer />} />
          <Route path="/create-importers" element={<AddImporters />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-invoice" element={<OrderInvoice />} />

          
          
          <Route path="/add-invoice" element={<CreateInvoice />} />
          <Route path="/invoice-list" element={<PPInvoiceList />} />
          <Route path="/create-new-drug" element={<CreateDrugLot />} />
          <Route path="/drug-inventory" element={<DrugInventory />} />
          <Route path="/pos" element={<PosScreen />} />
        </Routes>
      </BrowserRouter>
      <div className="sidebar-overlay"></div>
    </>
  );
};

export default Approuter;
