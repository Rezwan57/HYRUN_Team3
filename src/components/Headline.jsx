import React from "react";
import { FaDiamond } from "react-icons/fa6";

const headlines = [
  "Double the Joy, Double the Savings: Buy One, Get One Free on Your Favorite Items!",
  "Last Chance! Black Friday Deals Up to 70% Off Your Christmas Shopping",
  "Hurry! Limited-Time Offer: Extra 20% Off on All Electronics!",
  "Shop the Trend: Up to 50% Off New Arrivals!",
  "Weekend Special: Free Shipping on Orders Over £50!",
  "Mega Sale Alert: Buy More, Save More on Fashion Essentials!",
  "Exclusive Offer: Sign Up and Get 15% Off Your First Purchase!",
  "Countdown Begins: Cyber Monday Deals You Can't Miss!",
  "Winter Wonderland Sale: Cozy Up with Discounts Up to 60%!",
  "Shop Smart: Flash Deals Every Hour, Today Only!",
];

export default function Headline() {
  return (
    <div className="relative overflow-hidden bg-cyan-700 z-[999]">
      <div className="marquee whitespace-nowrap ">
        {headlines.map((headline, index) => (
          <span
            key={index}
            className="text-md font-medium flex items-center gap-4 py-1 text-white pl-4"
          >
            <FaDiamond />
            <span>{headline}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
