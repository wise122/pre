import { Zoom } from "react-awesome-reveal";

export const Buy = () => {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900"
      id="buy"
    >
      <Zoom>
        <div className="w-full max-w-[1200px] flex flex-col items-center p-3">
          <div className="text-center my-5">
            <h1 className="xl:text-[100px] text-[50px] text-white outlined-bold uppercase">
              {`Presale Info`}
            </h1>
          </div>
          
          {/* Centered Box */}
          <div className="flex justify-center">
            <div className="p-7 text-center border-2 border-white bg-[#222] rounded-2xl shadow-lg shadow-black font-bold text-lg w-[400px] text-white">
              <p>
                {`- Total Supply: 20Billions.`} <br />
                {`- Fair launch.`} <br />
                {`- Community driven.`} <br />
                {`- Buyback Guarantee.`} <br />
                {`- Presale duration 30 days.`} <br />
                {`- Burn unsold tokens.`} <br />
                {`- Smart contract audited.`} <br />
                {`- Handle by smart contract.`}
              </p>
            </div>
          </div>
        </div>
      </Zoom>
    </section>
  );
};
