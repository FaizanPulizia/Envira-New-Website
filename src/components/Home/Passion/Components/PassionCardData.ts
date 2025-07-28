import BackgroundImage from "@assets/Home/PassionCards/Background.webp";
import Image_1 from "@assets/Home/PassionCards/Construction.png";
import Image_2 from "@assets/Home/PassionCards/Service.png";
import HardHatIcon from "@assets/Icons/HardHat.svg";
import People from "@assets/Icons/People.svg";

type SvgComponent = ((_props: astroHTML.JSX.SVGAttributes) => any) &
  ImageMetadata;

export type PassionCardData = {
  title: string;
  description: string;
  background: ImageMetadata;
  image: ImageMetadata;
  card: {
    icon: SvgComponent;
    line1: string;
    line2: string;
  };
};
export const PassionCards: PassionCardData[] = [
  {
    title: "Trusted Solar Experts",
    description:
      "With years of experience in the solar industry, our team delivers top-notch installations and reliable services, ensuring you get the most out of your renewable energy investment.",

    background: BackgroundImage,
    image: Image_1,

    card: {
      icon: HardHatIcon,
      line1: "100+",
      line2: "Experts",
    },
  },
  {
    title: "Customer-Centric Service",
    description:
      "We prioritize your satisfaction, offering personalized solutions tailored to you needs. Form initial consultation to installation and beyond, we are with you every step of the way.",

    background: BackgroundImage,
    image: Image_2,

    card: {
      icon: People,
      line1: "300+",
      line2: "Users",
    },
  },
];
