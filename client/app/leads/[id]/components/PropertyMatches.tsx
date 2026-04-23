"use client";

import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";

interface PropertyMatch {
  name: string;
  unit: string;
  price: string;
  match: string;
  tags: string[];
  img: string;
}

const propertyMatches: PropertyMatch[] = [
  { 
    name: "The Skyline Loft", 
    unit: "Unit 87 \u2022 2 Bed \u2022 2 Bath", 
    price: "$2,600", 
    match: "98%", 
    tags: ["Balcony", "Gym"], 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmpiQHgBMAy9Ode0KKGgkseOm2d12byLj5NpgZ0x_GEEjfO6PINZ-4ySFNtsepQ8bIefY8qWT3NgDRdtqC1LkhI4tGkxSt3Wy0IJguGeNZi9CJN4pvIFHVE80j3n8M-pHMX5xnIZRqOBNFgP9kOlRNKxTVEzoxOvtaDUAA_zs6j26FzyEs98lsT1rIw_5--Z5Im_qzBN3A6ZDdAPIp3PSie5j3_8ZO9j_7e6I6IMWIYsFvYCrEm28Qf65K7hnlyoa6TwTVte7OIVw" 
  },
  { 
    name: "Modern Heights", 
    unit: "Unit 12 \u2022 1 Bed \u2022 1 Bath", 
    price: "$2,450", 
    match: "85%", 
    tags: ["Pool", "Parking"], 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmy4tabf881P9NsV0f25Pwmdq91t-kWSwUqPK1iOuAu-beS09VvThswIk95FFIQ6x1gJoVUHDl3rrEHJ8Myq4Uzf3uCMH1wuBk9mj-JESQuzKJuaAFvrocziloOvtFrDrlX0o2ukV6FBJOPmvBaQF9QagzTdcHhTLRvaInGomtmQqn-mHI1xLPo3pr6VqTSOVWa1XHucISo6nY2ShBE4x95XxVJDGYchYzy51gDVxIHxrwrDuwpzCuJSrYx9hiWqs9m8An8kS7vS8" 
  },
];

interface PropertyMatchesProps {
  onFetchMore: () => void;
}

export function PropertyMatches({ onFetchMore }: PropertyMatchesProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold dark:text-white">Property Matches</h3>
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest transition-colors group-hover:text-primary">Sort by match</span>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
        </div>
      </div>

      {propertyMatches.map((property, i) => (
        <div key={i} className="bg-white dark:bg-surface-dark p-4 rounded-[2rem] shadow-soft flex gap-6 items-center group cursor-pointer hover:shadow-xl transition-all border border-transparent hover:border-primary/30 relative active:scale-[0.98]">
          <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 relative shadow-md">
            <Image src={property.img} alt={property.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg">
              {property.match} MATCH
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="text-base font-bold dark:text-white group-hover:text-primary transition-colors">{property.name}</h4>
              <span className="text-sm font-black text-primary">{property.price}<span className="text-[10px] text-gray-400 font-bold ml-1">/MO</span></span>
            </div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">{property.unit}</p>
            <div className="flex gap-2 mt-4">
              {property.tags.map((tag, ti) => (
                <span key={ti} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-[9px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center bg-white dark:bg-surface-dark shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-4">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ))}

      <button
        onClick={onFetchMore}
        className="w-full py-5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-400 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all uppercase tracking-widest hover:border-primary hover:text-primary group"
      >
        See 4 other matches <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
