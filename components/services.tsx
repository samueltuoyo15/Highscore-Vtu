import { Phone, Wifi, Tv, Zap, HardDrive, Smartphone } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      name: "Airtime",
      icon: <Phone className="w-6 h-6" />,
      bg: "bg-blue-100",
      text: "text-blue-600",
      href: "/airtime",
    },
    {
      name: "Data",
      icon: <Wifi className="w-6 h-6" />,
      bg: "bg-green-100",
      text: "text-green-600",
      href: "/data",
    },
    {
      name: "Cable TV",
      icon: <Tv className="w-6 h-6" />,
      bg: "bg-purple-100",
      text: "text-purple-600",
      href: "/cable",
    },
    {
      name: "Electricity",
      icon: <Zap className="w-6 h-6" />,
      bg: "bg-amber-100",
      text: "text-amber-600",
      href: "/electricity",
    },
    {
      name: "Internet",
      icon: <HardDrive className="w-6 h-6" />,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      href: "/internet",
    },
    {
      name: "Mobile Money",
      icon: <Smartphone className="w-6 h-6" />,
      bg: "bg-pink-100",
      text: "text-pink-600",
      href: "/transfer",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4 max-w-2xl mx-auto">
      {services.map((service, index) => (
        <Link
          key={index}
          href={service.href}
          className="bg-white flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div
            className={`mb-3 p-3 ${service.bg} ${service.text} rounded-full`}
          >
            {service.icon}
          </div>
          <span className="font-semibold text-xs sm:text-sm text-gray-700 text-center whitespace-nowrap">
            {service.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
