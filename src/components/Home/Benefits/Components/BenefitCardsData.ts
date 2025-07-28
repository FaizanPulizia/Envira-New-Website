import EnergySecurity from "@assets/Home/Benefits/EnergySecurity.webp";
import EnvironmentalImpact from "@assets/Home/Benefits/EnvironmentalImpact.webp";
import FinancialBenefits from "@assets/Home/Benefits/FinancialBenefits.webp";
import RisingElectricityBill from "@assets/Home/Benefits/RisingElectricityBill.webp";

export type BenefitCardData = {
  title: string;
  description: string;
  image: ImageMetadata;
};

export const BenefitCardsData: BenefitCardData[] = [
  {
    title: "Financial Incentives",
    description:
      "Act now to unlock solar subsidies, tax credits, and rebates—before they expire. Delay means losing major savings on installation and long-term energy costs.",
    image: FinancialBenefits,
  },
  {
    title: "Energy Security",
    description:
      "Break free from grid dependency. Solar gives you energy independence, protection from outages, and consistent power—even during peak demand or price surges.",
    image: EnergySecurity,
  },
  {
    title: "Environmental Impact",
    description:
      "Switch to solar and cut carbon emissions. Every day you delay increases fossil fuel use and your environmental footprint. Be part of the clean energy transition today.",
    image: EnvironmentalImpact,
  },
  {
    title: "Rising Electricity Costs",
    description:
      "Traditional power bills keep climbing. Solar cuts costs by up to 70%, shielding you from rising rates and inconsistent power supply ensuring predictable, affordable electricity.",
    image: RisingElectricityBill,
  },
];
