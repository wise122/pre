/* eslint-disable @next/next/no-img-element */
import { Fade, JackInTheBox, Slide, Zoom } from "react-awesome-reveal";

export const About = () => {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 min-h-screen flex flex-col items-center justify-center relative">
      <Slide className="z-[99]">
        <div className="w-full max-w-[1200px] flex p-3 relative flex-col animate__animated animate__fadeIn items-center gap-4">
          <div className="flex items-center justify-center gap-3 flex-col">
            <h1 className="xl:text-[100px] text-[50px] text-white outlined-bold uppercase">
              {`About us`}
            </h1>
            <p className="text-white font-bold text-3xl text-center">
              {`Binky the innocent of the bunnies!`}
            </p>
          </div>
          <div className="md:w-[450px] w-[350px] p-4 border-2 border-white bg-gray-800 rounded-2xl shadow-md shadow-black text-white">
            <p>
              {`Binky is an innocent rabbit who dreams of becoming a crypto millionaire alongside her friends in this bull run!`}{" "}
              <br />
              {`Binky's mission is to hop through all the meme coins and establish her dominion as the queen of cryptocurrencies.`}
              <br />
              {`She won't stop until she achieves it!`}
            </p>
          </div>
        </div>
      </Slide>

      <Fade>{/* Additional animations or elements can be added here */}</Fade>
    </section>
  );
};
