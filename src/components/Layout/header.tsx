/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import { MdClose } from "react-icons/md";
import WalletConnectBtn from "../WalletConnectButton";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  TELEGRAM_LINK,
  TWITTER_LINK,
  SITE_LINK,
} from "../../config";
import {
  TbBrandDiscord,
  TbBrandTwitter,
  TbBrandWebflow,
  TbMenu2,
} from "react-icons/tb";
import { menuData } from "./menuData";
import Link from "next/link";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { disconnect } = useWallet(); // Solana Wallet Adapter

  return (
    <>
      <div className="w-full xl:flex items-center justify-center border-opacity-5 p-1 bg-transparent backdrop-blur-sm fixed z-[9999] border-b-[1px] border-[#29292921] py-2">
        <div className="xl:w-[1200px] w-auto flex items-center justify-between px-3">
          {/* Logo */}
          <div className="flex items-center justify-center p-1 gap-3 border-[2px] border-[#00000042] rounded-full">
            <Link href="/">
              <img
                src="/imgs/logo.png"
                className="w-[50px] h-[50px] border-black rounded-full"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Menu Items */}
          <ul className="items-center justify-center gap-8 lg:flex hidden">
            {menuData.map((data, index) => (
              <li
                key={index}
                onClick={() => router.push(data.path)}
                className="text-white cursor-pointer text-xl font-bold hover:text-blue-400 duration-300"
              >
                {data.title}
              </li>
            ))}
          </ul>

          {/* Wallet & Social Icons */}
          <div className="items-center justify-center gap-3 flex">
            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#033FD5] border-black hover:shadow-black shadow-black shadow-sm hover:shadow-md duration-300 cursor-pointer hidden md:block">
                <TbBrandDiscord color="white" />
              </div>
            </a>
            <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#033FD5] border-black hover:shadow-black shadow-black shadow-sm hover:shadow-md duration-300 cursor-pointer hidden md:block">
                <TbBrandTwitter color="white" />
              </div>
            </a>
            <a href={SITE_LINK} target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#033FD5] border-black hover:shadow-black shadow-black shadow-sm hover:shadow-md duration-300 cursor-pointer hidden md:block">
                <TbBrandWebflow color="white" />
              </div>
            </a>
            
            {/* Connect & Change Wallet Buttons */}
            <div className="flex gap-2">
              <WalletConnectBtn />
              <button
                onClick={() => disconnect()}
                className="px-4 py-2 bg-[#007bff] text-white font-bold rounded-lg hover:bg-[#0056b3] transition duration-300"
              >
                Change Wallet
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="cursor-pointer lg:hidden" onClick={() => setShowMenu(true)}>
              <TbMenu2 size={30} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-20 backdrop-blur-md z-[9999] flex items-center justify-center gap-9 flex-col">
          <div className="absolute top-5 right-5" onClick={() => setShowMenu(false)}>
            <MdClose size={30} />
          </div>
          {menuData.map((data, index) => (
            <li
              key={index}
              onClick={() => {
                router.push(data.path);
                setShowMenu(false);
              }}
              className="text-white cursor-pointer font-bold hover:text-blue-400 duration-300 list-none text-3xl"
            >
              {data.title}
            </li>
          ))}
          <div className="flex items-center justify-center gap-3">
            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#033FD5] border-black hover:shadow-black shadow-black shadow-sm hover:shadow-md duration-300 cursor-pointer">
                <TbBrandDiscord color="white" />
              </div>
            </a>
            <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#033FD5] border-black hover:shadow-black shadow-black shadow-sm hover:shadow-md duration-300 cursor-pointer">
                <TbBrandTwitter color="white" />
              </div>
            </a>
            <a href={SITE_LINK} target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#033FD5] border-black hover:shadow-black shadow-black shadow-sm hover:shadow-md duration-300 cursor-pointer">
                <TbBrandWebflow color="white" />
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
