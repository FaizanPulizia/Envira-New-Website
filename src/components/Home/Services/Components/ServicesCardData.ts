import FloatingSolar from "@assets/Home/Services/FloatingSolar.webp";
import OpenAccess from "@assets/Home/Services/OpenAccess.webp";
import RooftopSolar from "@assets/Home/Services/RooftopSolar.webp";
import SolarCarport from "@assets/Home/Services/SolarCarport.webp";

export type ServicesCardData = {
  title: string;
  description: string;
  image: ImageMetadata;
};

export const ServicesCards: ServicesCardData[] = [
  {
    title: "Rooftop Solar",
    description:
      "Envira Energies offers fully integrated EPC solutions for rooftop solar. We cater to government, commercial, institutional, and residential sectors, delivering efficient and reliable solar energy solutions tailored to diverse needs.",
    image: RooftopSolar,
  },
  {
    title: "Open Access",
    description:
      "Envira Energies enables businesses to purchase solar power from the open market, providing a cost-effective alternative to grid electricity.",
    image: OpenAccess,
  },
  {
    title: "Floating Solar",
    description:
      "Envira Energies provides floating solar solutions that harness the power of the sun without utilizing valuable land. By utilizing unused water bodies, clients can save space while enjoying all the benefits of clean and efficient solar energy.",
    image: FloatingSolar,
  },
  {
    title: "Solar Carports",
    description:
      "Envira Energies' solar carports combine functionality and sustainability, providing shade for parked vehicles while generating clean, renewable energy. They offer a smart, dual-purpose solution for commercial and sustainable benefits.",
    image: SolarCarport,
  },
];
