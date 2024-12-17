import { Clock, Droplet, Package, Thermometer } from "lucide-react";

interface Props {
  PRICE_PER_KG: number;
  DAYS_AGO_GATHERED: number;
  STOCK_AMOUNT: number;
  STORAGE_TEMPERATURE: number;
  HUMIDITY_LEVEL: number;
}

export default function SingleProductAdditionalInformation({
  PRICE_PER_KG,
  DAYS_AGO_GATHERED,
  STOCK_AMOUNT,
  STORAGE_TEMPERATURE,
  HUMIDITY_LEVEL,
}: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Fresh Organic Lettuce</h1>
      <p className="text-xs text-gray-600 mb-4">Farm-fresh, crisp, and nutritious lettuce perfect for salads and sandwiches.</p>
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold mr-2">${PRICE_PER_KG.toFixed(2)}</span>
        <span className="text-xs text-gray-600">per kg</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-xs text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>Gathered {DAYS_AGO_GATHERED} days ago</span>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <Package className="w-4 h-4 mr-1" />
          <span>Stock: {STOCK_AMOUNT}</span>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <Thermometer className="w-4 h-4 mr-1" />
          <span>Kept at {STORAGE_TEMPERATURE}°C</span>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <Droplet className="w-4 h-4 mr-1" />
          <span>Humidity: {HUMIDITY_LEVEL}%</span>
        </div>
      </div>
    </>
  );
}
