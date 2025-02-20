/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { TokenomicsChart } from "./Chart";
import { Bounce } from "react-awesome-reveal";

export const Tokenomics = () => {
  return (
    <section
      className="w-full bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center justify-center relative"
      id="tokenomics"
    >
      <Bounce>
        <div className="w-full xl:max-w-[1200px] flex p-3 relative justify-between animate__animated animate__fadeIn items-center gap-10 xl:flex-row flex-col">
          <div className="flex items-start justify-start my-5 flex-col gap-4 mt-[70px]">
            <h1 className="xl:text-[100px] text-[50px] text-white outlined-bold uppercase">{`Tokenomics`}</h1>
            <h1 className="xl:text-[50px] text-[25px] text-white">{`Total Supply: 20B`}</h1>
            
            <div className="md:w-[550px] w-[350px] rounded-full bg-gray-700 h-[20px]">
              <div className="w-[25%] bg-[#E16DDF] rounded-full h-full" />
            </div>
            <h1 className="md:w-[550px] text-white text-2xl font-bold">{`25% Presale`}</h1>

            <div className="md:w-[550px] w-[350px] rounded-full bg-gray-700 h-[20px]">
              <div className="w-[30%] bg-[#FED41D] rounded-full h-full" />
            </div>
            <h1 className="md:w-[550px] w-[350px] text-white text-2xl font-bold">{`30% LP`}</h1>

            <div className="md:w-[550px] w-[350px] rounded-full bg-gray-700 h-[20px]">
              <div className="w-[30%] bg-[#FA7C29] rounded-full h-full" />
            </div>
            <h1 className="md:w-[550px] w-[350px] text-white text-2xl font-bold">{`30% Staking rewards`}</h1>

            <div className="md:w-[550px] w-[350px] rounded-full bg-gray-700 h-[20px]">
              <div className="w-[10%] bg-[#033FD5] rounded-full h-full" />
            </div>
            <h1 className="text-white text-2xl font-bold">{`10% Airdrop`}</h1>
            
            <div className="md:w-[550px] w-[350px] rounded-full bg-gray-700 h-[20px]">
              <div className="w-[5%] bg-[#008000] rounded-full h-full" />
            </div>
            <h1 className="text-white text-2xl font-bold">{`5% Team`}</h1>
          </div>

          <div className="md:w-[500px] w-full h-full p-10 relative bg-gray-800 rounded-full border-2 border-white">
            <TokenomicsChart />
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-2 border-gray-600 rounded-full">
                <Image
                  src={"/imgs/logo.png"}
                  alt="Avatar"
                  className="rounded-full"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </Bounce>
    </section>
  );
};
