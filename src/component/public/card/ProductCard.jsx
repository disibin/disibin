'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const primaryImage =
    product?.images?.find((img) => img.is_primary)?.image ||
    product?.images?.[0]?.image;

  const finalPrice = product?.price != null ? product.price - (product.discount || 0) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        href={`/products/${product?.slug}`}
        className="group flex flex-col w-full bg-white border border-slate-200/80 rounded-sm overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      >
        <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product?.name || 'Product'}
              width={500} height={500}
              className="w-full "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-poppins">
              No preview image
            </div>
          )}

          {product?.is_featured && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-xs font-poppins">
              Featured
            </span>
          )}
        </div>

        <div className="p-2 flex flex-col justify-between grow gap-3">
          <h2 className="font-semibold text-primary group-hover:text-secondary transition-colors font-poppins line-clamp-2">
            {product?.name}
          </h2>

          {finalPrice != null && (
            <div className="flex items-baseline justify-between p-2 border-t border-slate-100 mt-auto">
              <div className="flex items-baseline gap-2">
                <span className=" font-semibold text-slate-900 font-poppins">
                  ${finalPrice}
                </span>
                {product?.discount > 0 && (
                  <span className="text-xs sm:text-sm text-slate-400 line-through font-poppins">
                    ${product.price}
                  </span>
                )}
              </div>
              {product?.discount > 0 && (
                <span className="text-xs font-semibold bg-primary-light text-tertiary-light px-2 py-0.5 rounded-full font-poppins">
                  ${product.discount} OFF
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
