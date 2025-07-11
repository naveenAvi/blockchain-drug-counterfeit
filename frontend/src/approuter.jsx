import React from "react";
// eslint-disable-next-line no-unused-vars

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./CommonPages/login";
import AddNewDrug from "./CommonPages/DrugInventory/AddNewDrug";
import PosScreen from "./CommonPages/Pos/PosScreen";
import AddImporters from "./CommonPages/ConnectedParties/AddImporters";
import CreateOrder from "./CommonPages/Transactions/CreateOrder";
import OrderList from "./CommonPages/Approvals/OrderList";
import OrderInvoice from "./CommonPages/Approvals/OrderInvoice";
import AddEntity from "./CommonPages/ConnectedParties/AddEntity";
import ListConnectedParties from "./CommonPages/ConnectedParties/ListConnectedParties";
// import AddEntity from "./CommonPages/ConnectedParties/AddEntity";
import EntityUserCreation from "./CommonPages/usermanagement/EntityUserCreation";
import EntityUserList from "./CommonPages/usermanagement/EntityUserList";
import ViewDrug from "./CommonPages/DrugInventory/ViewDrug/ViewDrug";

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
          <Route path="/create/:entityType" element={<AddEntity />} />
          <Route path="/list-party/:entityType" element={<ListConnectedParties />} />
          <Route path="/entity-user-create/:entityId" element={<EntityUserCreation />} />
          <Route path="/entity-user-list/:entityId" element={<EntityUserList />} />
          

          
          <Route path="/create-importers" element={<AddImporters />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-invoice" element={<OrderInvoice />} />
          <Route path="/view-drug" element={<ViewDrug />} />

          
          
          <Route path="/pos" element={<PosScreen />} />
        </Routes>
      </BrowserRouter>
      <div className="sidebar-overlay"></div>
    </>
  );
};

export default Approuter;
