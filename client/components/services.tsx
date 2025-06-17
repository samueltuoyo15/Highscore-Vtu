import { Phone, Wifi, Tv, Zap, Clock, Bookmark, HardDrive, Smartphone } from "lucide-react"

export default function Services() {
  const services = [
    { name: "Airtime", icon: <Phone className="w-6 h-6" />, bg: "bg-blue-100", text: "text-blue-600" },
    { name: "Data", icon: <Wifi className="w-6 h-6" />, bg: "bg-blue-100", text: "text-blue-600" },
    { name: "Cable TV", icon: <Tv className="w-6 h-6" />, bg: "bg-purple-100", text: "text-purple-600" },
    { name: "Electricity", icon: <Zap className="w-6 h-6" />, bg: "bg-amber-100", text: "text-amber-600" },
    { name: "Internet", icon: <HardDrive className="w-6 h-6" />, bg: "bg-purple-100", text: "text-purple-600" },
    { name: "Mobile Money", icon: <Smartphone className="w-6 h-6" />, bg: "bg-blue-100", text: "text-blue-600" },
  ]

  return (
    <div className="grid grid-cols-3 gap-2 p-4 max-w-2xl mx-auto">
      {services.map((service, index) => (
        <div 
          key={index}
          className="bg-white flex flex-col items-center justify-center p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className={`mb-2 p-3 ${service.bg} ${service.text} rounded-full`}>
            {service.icon}
          </div>
          <span className="font-medium text-sm text-gray-700 text-center whitespace-nowrap">
            {service.name}
          </span>
        </div>
      ))}
    </div>
  )
}