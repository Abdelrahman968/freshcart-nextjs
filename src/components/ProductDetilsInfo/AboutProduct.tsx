import { FaCheck, FaTimes } from 'react-icons/fa';
import { ProductCardProps } from '../../types/product.type';
import formatSold from '../../utils/formatSold';

interface AboutProductProps {
  product: ProductCardProps;
}

function AboutProduct({ product }: AboutProductProps) {
  const sold = formatSold(product.sold);

  const featuresList = [
    {
      id: '1',
      name: 'Premium Quality Product',
      checked: true,
    },
    {
      id: '2',
      name: '100% Authentic Guarantee',
      checked: true,
    },
    {
      id: '3',
      name: 'Fast &amp; Secure Packaging',
      checked: true,
    },
    {
      id: '4',
      name: 'Quality Tested',
      checked: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About this Product
          </h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">
              Product Information
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-900 font-medium">
                  {product.category.name}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Subcategory</span>
                <span className="text-gray-900 font-medium">
                  {product.subcategory[0].name}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Brand</span>
                <span className="text-gray-900 font-medium">
                  {product.brand.name}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Items Sold</span>
                <span className="text-gray-900 font-medium">
                  {sold === '0' ? 'Not Sold' : `${sold} sold`}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
            <ul className="space-y-2">
              {featuresList.map(feature => (
                <li
                  key={feature.id}
                  className="flex items-center text-sm text-gray-600 gap-2"
                >
                  {feature.checked ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                  {feature.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProduct;
