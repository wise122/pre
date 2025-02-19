/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Bounce, Fade } from "react-awesome-reveal";

export const First = () => {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 min-h-screen items-center justify-center flex bg-no-repeat bg-center bg-cover flex-col relative">
      <div
        className="w-full xl:max-w-[1200px] lg:max-w-[900px] flex p-3 relative flex-col animate__animated animate__fadeIn
        z-[999]"
      >
        <div className="flex items-center justify-center gap-3 flex-col">
          <Bounce>
          <h1 className="xl:text-[120px] lg:text-[85px] md:text-[60px] text-[40px] outlined-bold">
  {`xHAMSTER TOKEN`}
</h1>

            <p className="text-white outlined font-bold md:text-3xl text-xl text-center">
              {`The Revolutioning Porn-Crypto Hub.`} <br />
             
            </p>
            <Link href={"/presale"}>
              <div
                className="text-white bg-[#033FD5] px-7 py-3 rounded-full text-3xl outlined mt-[40px]
              shadow-black shadow-md hover:shadow-lg hover:shadow-black duration-300"
              >{`Presale Now`}</div>
            </Link>
          </Bounce>
        </div>
      </div>
      <Fade className="absolute right-0">
       
      </Fade>
    </section>
  );
};
