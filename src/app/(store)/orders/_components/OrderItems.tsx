import { FaReceipt } from 'react-icons/fa';

interface OrderItemProps {
  title: string;
  imageCover: string;
  price: number;
  count: number;
}

interface OrderItemsProps {
  items: OrderItemProps[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="p-5 sm:p-6">
      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
          <FaReceipt className="text-xs text-green-600" />
        </div>
        Order Items
      </h4>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
          >
            <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
              <img
                alt={item.title}
                className="w-full h-full object-contain"
                src={item.imageCover}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium text-gray-700">{item.count}</span>{' '}
                × {item.price.toLocaleString()} EGP
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-gray-900">
                {(item.price * item.count).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">EGP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
