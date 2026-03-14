'use client';
import { Tab, Tabs } from '@heroui/react';
import { FaBox, FaTruck } from 'react-icons/fa';
import { useState } from 'react';
import { FaStarHalfStroke } from 'react-icons/fa6';
import AboutProduct from './AboutProduct';
import { ProductCardProps } from '../../types/product.type';
import ReviewProduct from './ReviewProduct';
import ShippingProduct from './ShippingProduct';

function ProductDetailsInfo({ product }: { product: ProductCardProps }) {
  const [selected, setSelected] = useState<
    'product-details' | 'reviews' | 'shipping-info'
  >('product-details');
  return (
    <section className="py-8 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Tabs variants"
          variant="solid"
          color="success"
          size="lg"
          selectedKey={selected}
          onSelectionChange={key =>
            setSelected(key as 'product-details' | 'reviews' | 'shipping-info')
          }
        >
          <Tab
            key="product-details"
            title={
              <div className="flex items-center space-x-2">
                <FaBox />
                <span>Product Details</span>
              </div>
            }
          >
            <div className="border-2 border-gray-200 rounded-lg">
              <AboutProduct product={product} />
            </div>
          </Tab>
          <Tab
            key="reviews"
            title={
              <div className="flex items-center space-x-2">
                <FaStarHalfStroke />
                <span>Reviews</span>
              </div>
            }
          >
            <div className="border-2 border-gray-200 p-5 rounded-lg">
              <ReviewProduct product={product} />
            </div>
          </Tab>
          <Tab
            key="shipping-info"
            title={
              <div className="flex items-center space-x-2">
                <FaTruck />
                <span>Shipping & Returns</span>
              </div>
            }
          >
            <div className="border-2 border-gray-200 p-5 rounded-lg">
              <ShippingProduct />
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}

export default ProductDetailsInfo;
