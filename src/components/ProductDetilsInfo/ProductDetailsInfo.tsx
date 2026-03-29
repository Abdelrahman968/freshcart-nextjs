'use client';
import { Chip, Tab, Tabs } from '@heroui/react';
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
          className="mx-auto md:mx-1 text-sm md:text-base lg:text-lg"
          selectedKey={selected}
          onSelectionChange={key =>
            setSelected(key as 'product-details' | 'reviews' | 'shipping-info')
          }
        >
          <Tab
            key="product-details"
            title={
              <div className="flex items-center gap-1 sm:gap-2">
                <FaBox className="text-lg md:text-base" />
                <span className="hidden sm:block">Product Details</span>
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
              <div className="flex items-center gap-1 sm:gap-2">
                <FaStarHalfStroke className="text-lg md:text-base" />
                <span className="hidden sm:block">Reviews</span>
                <Chip variant="flat" size="sm">
                  {product.reviews.length}
                </Chip>
              </div>
            }
          >
            <div className="border-2 border-gray-200 p-5 rounded-lg">
              <ReviewProduct productId={product._id} />
            </div>
          </Tab>
          <Tab
            key="shipping-info"
            title={
              <div className="flex items-center gap-1 sm:gap-2">
                <FaTruck className="text-lg md:text-base" />
                <span className="hidden sm:block">Shipping & Returns</span>
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
