import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const fadeImages = [
  {
    url: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    caption: "God Of War (2018)",
    caption2: `A Norse Mythology Masterclass: The game's development team hired a historian specializing in Norse mythology to ensure the lore and mythology were accurately represented. This dedication to authenticity added a layer of depth and historical accuracy to the game's world.`,
  },
  {
    url: "https://media.rawg.io/media/screenshots/862/862397b153221a625922d3bb66337834.jpg",
    caption: "The Witcher 3: Wild Hunt",
    caption2: "A Massive Open World: The game's map is so large that it's estimated to be roughly the size of Poland! This vast landscape allows for countless hours of exploration and adventure.",
  },
  {
    url: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
    caption: "Shadow of the Tomb Raider: Definitive Edition",
    caption2: `A Definitive Experience: This edition includes all the DLC released for the game, such as "The Tomb of the Lost City" and "The Path of the Serpent," offering a complete and enhanced experience for players.`,
  },
  {
    url: "https://media.rawg.io/media/screenshots/7b8/7b8895a23e8ca0dbd9e1ba24696579d9.jpg",
    caption: "Red Dead Redemption 2",
    caption2: `A Living World: The game's world is incredibly dynamic, with animals behaving realistically, weather patterns changing over time, and even individual NPCs having their own daily routines. This attention to detail creates a truly immersive experience.`,
  },
  {
    url: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    caption: "Grand Theft Auto V",
    caption2: `A Record-Breaking Success: GTA V holds the record for the fastest-selling video game of all time, selling over 11 million copies in its first week of release. Its immense popularity and enduring appeal have solidified its place in gaming history.`,
  },
  {
    url: "https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg",
    caption: "GTA: San Andreas",
    caption2: `A Cultural Phenomenon: The game's soundtrack, featuring a diverse mix of hip-hop, R&B, and funk, became a cultural phenomenon and introduced many players to new genres of music. The game's soundtrack is still celebrated today and is considered one of the best in video game history.`,
  },
  {
    url: "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg",
    caption: "Baldur's Gate 3",
    caption2: `A Massive Multiplayer Campaign: While primarily a single-player RPG, Baldur's Gate 3 also features a multiplayer co-op mode where up to four players can join forces to tackle the game's challenges together, creating unique and dynamic gameplay experiences.`,
  },
  {
    url: "https://media.rawg.io/media/screenshots/398/398abeb965880c1c3310a6a4ad9c71b8.jpg",
    caption: "Assassin's Creed IV: Black Flag",
    caption2: `A Pirate's Life for Me: The game's naval gameplay was so well-received that it became a major focus of subsequent Assassin's Creed games. The ability to explore the open seas, engage in naval battles, and discover hidden treasures was a refreshing addition to the series.`,
  },
];

const Slideshow = () => {
  return (
    <div className="">
      <Fade duration={5000} transitionDuration={500} autoplay>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} className="relative h-screen">
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.8,
              }}
              src={fadeImage.url}
              alt={fadeImage.caption}
            />

            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black opacity-100" />
            <div className="absolute bottom-28 left-5 flex flex-col ml-5 max-w-md">
              {" "}
              {/* Added max-w-md */}
              <h2 className="text-white text-4xl font-bold mb-2">{fadeImage.caption}</h2>
              <p className="text-white text-md mt-2 mb-4 whitespace-normal">
                {" "}
                {/* Adjusted to prevent overflow */}
                {fadeImage.caption2}
              </p>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
