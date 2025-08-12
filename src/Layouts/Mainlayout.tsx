
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

import Modal from "../Components/Modal";

export default function mainLayout() {
  return (
    <>
      <Modal />
      <Navbar />

      <div className="w-full max-w-[130rem] mx-auto  h-screen ">
        <Outlet />
      </div>
   
    </>
  );
}
