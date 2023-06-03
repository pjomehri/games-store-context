import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const categories = [
  {
    id: 1,
    title: "Amiga 500",
    imageUrl:
      "https://cdn.images.express.co.uk/img/dynamic/143/590x/amiga-mini-1593425.jpg",
    route: "shop/hats",
  },
  {
    id: 2,
    title: "Nintendo",
    imageUrl:
      "https://w7.pngwing.com/pngs/534/742/png-transparent-super-nintendo-entertainment-system-wii-video-game-consoles-nintendo-text-nintendo-logo.png",
    route: "shop/mens",
  },
  {
    id: 3,
    title: "PlayStation",
    imageUrl:
      "https://www.vhv.rs/dpng/d/462-4622022_retro-arcade-png-retro-arcade-logo-png-transparent.png",
    route: "shop/jackets",
  },
  {
    id: 4,
    title: "PlayStation",
    imageUrl:
      "https://e7.pngegg.com/pngimages/942/214/png-clipart-playstation-2-playstation-vr-playstation-camera-super-nintendo-entertainment-system-playstation-4-logo-text-logo.png",
    route: "shop/womens",
  },
  {
    id: 5,
    title: "PC Games",
    imageUrl:
      "https://w7.pngwing.com/pngs/443/298/png-transparent-steamworld-dig-2-video-game-opus-rocket-of-whispers-pc-game-others-miscellaneous-text-trademark.png",
    route: "shop/sneakers",
  },
];

const Directory = () => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <DirectoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
