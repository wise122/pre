/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { TbBrandDiscord, TbBrandTelegram, TbBrandTwitter } from "react-icons/tb";
import {
  TELEGRAM_LINK,
  TWITTER_LINK,
} from "../../config";
import { usePathname } from "next/navigation";

const Footer = () => {
  const router = usePathname();

  return (
    <div
      className={`w-full flex flex-col items-center justify-between relative bg-gradient-to-b from-black to-gray-900 py-10 text-white
    ${router === "/presale" && "hidden"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center border-2 border-white relative w-[150px] h-[150px] rounded-full">
        <Image
          alt="Avatar"
          fill
          src={"/imgs/logo.png"}
          className="rounded-full"
        />
      </div>

      {/* Disclaimer */}
      <p className="text-md font-bold text-center md:w-[700px] w-full mt-4">
        {`Disclaimer: BInky Bunny is a meme coin made for entertainment purposes. We make no promises about future value, so be responsible. Crypto may be unregulated in your jurisdiction.`}
      </p>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-3 my-5 z-10">
        <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
          <div className="p-3 rounded-full shadow-lg bg-blue-500 border border-white hover:shadow-white duration-300 cursor-pointer">
            <TbBrandTwitter color="white" size={24} />
          </div>
        </a>
        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
          <div className="p-3 rounded-full shadow-lg bg-blue-500 border border-white hover:shadow-white duration-300 cursor-pointer">
            <TbBrandTelegram color="white" size={24} />
          </div>
        </a>
        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
          <div className="p-3 rounded-full shadow-lg bg-blue-500 border border-white hover:shadow-white duration-300 cursor-pointer">
            <TbBrandDiscord color="white" size={24} />
          </div>
        </a>
      </div>

      {/* Footer Image */}
      
    </div>
  );
};

export default Footer;
