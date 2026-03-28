import { FaPhone } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { ShippingAddress } from '../../../../types/order.type';

interface DeliveryAddressProps {
  shippingAddress: ShippingAddress;
}

export default function DeliveryAddress({
  shippingAddress,
}: DeliveryAddressProps) {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-100">
      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
          <FaLocationDot className="text-xs text-blue-600" />
        </div>
        Delivery Address
      </h4>
      <div className="space-y-2">
        <p className="font-medium text-gray-900">{shippingAddress.city}</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {shippingAddress.details}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
          <FaPhone className="text-xs text-gray-400" />
          {shippingAddress.phone}
        </p>
      </div>
    </div>
  );
}
