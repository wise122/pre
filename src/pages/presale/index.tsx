"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Bounce } from "react-awesome-reveal";
import {
  CubeSpinner,
  GooSpinner,
  GuardSpinner,
  HeartSpinner,
} from "react-spinners-kit";
import { PresaleDetail } from "../../components/PresaleDetail";

const Presale = () => {
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col relative bg-gradient-to-b from-black to-gray-900">

        <div
          className="w-full xl:max-w-[900px] lg:max-w-[900px] flex p-3 relative flex-col animate__animated animate__fadeIn
        items-center justify-center z-[999] gap-5 md:mt-10 mt-[100px]"
        >
          <div className="flex items-center justify-center gap-3 flex-col">
            <Bounce>
            <h1 className="xl:text-[80px] lg:text-[70px] md:text-[50px] sm:text-[40px] text-[30px] outlined-bold">
  {`xHAMSTER PRESALE`}
</h1>

              <p className="text-white outlined font-bold md:text-2xl text-xl text-center">
                {`The Revolutioning Porn-Crypto Hub.`} <br />
                
              </p>
            </Bounce>
          </div>
          <PresaleDetail />
        </div>
      </div>
    </>
  );
};
export default Presale;
