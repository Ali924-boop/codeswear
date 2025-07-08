// pages/mugs.js

import Image from 'next/image';
import Link from 'next/link';
import Productdb from '../models/Productdb';
import mongoose from 'mongoose';

const Mugs = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font md:items-center">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry all the hoodies are currently out of stock. New Stock is Coming Soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
              const product = products[item];
              const slug = product.slug && product.slug.trim() !== '' ? product.slug : null;

              const colors = Array.isArray(product.color)
                ? product.color
                : product.color
                  ? [product.color]
                  : [];

              const sizes = Array.isArray(product.size)
                ? product.size
                : product.size
                  ? [product.size]
                  : [];

              const images =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images
                  : ['https://m.media-amazon.com/images/I/51OqGIRYTDL._AC_SX466_.jpg'];

              const ProductContent = (
                <>
                  <div className="flex flex-col justify-between h-full">
                    {/* Image Section */}
                    <div className="flex justify-center overflow-x-auto space-x-4 mb-3 px-2">
                      {images.map((imgSrc, idx) => (
                        <div key={idx} className="min-w-[200px] flex justify-center">
                          <Image
                            alt={`${product.title} image ${idx + 1}`}
                            src={imgSrc}
                            width={200}
                            height={200}
                            className="rounded p-2"
                            priority={idx === 0}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Text Fixed to Bottom */}
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Mugs</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                      <p className="mt-1">RS {product.price}</p>

                      {/* Sizes */}
                      <div className="mt-1">
                        {sizes.length > 0 ? (
                          sizes.map((size) => (
                            <span key={size} className="border border-gray-300 mx-1 px-2 rounded text-xs">
                              {size}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No sizes available</span>
                        )}
                      </div>

                      {/* Colors */}
                      <div className="mt-2 flex justify-center md:justify-start flex-wrap gap-2">
                        {colors.includes('white') && (
                          <button className="border-2 border-gray-300 bg-white rounded-full w-6 h-6" />
                        )}
                        {colors.includes('red') && (
                          <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6" />
                        )}
                        {colors.includes('blue') && (
                          <button className="border-2 border-gray-300 bg-blue-950 rounded-full w-6 h-6" />
                        )}
                        {colors.includes('green') && (
                          <button className="border-2 border-gray-300 bg-green-600 rounded-full w-6 h-6" />
                        )}
                        {colors.includes('yellow') && (
                          <button className="border-2 border-gray-300 bg-yellow-500 rounded-full w-6 h-6" />
                        )}
                        {colors.includes('black') && (
                          <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6" />
                        )}
                        {colors.includes('purple') && (
                          <button className="border-2 border-gray-300 bg-purple-600 rounded-full w-6 h-6" />
                        )}
                      </div>
                    </div>
                  </div>

                </>
              );

              return (
                <div key={product._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                  {slug ? (
                    <Link href={`/product/${slug}`} className="block h-full rounded overflow-hidden bg-white">
                      <div className="flex flex-col justify-between h-full">
                        {ProductContent}
                      </div>
                    </Link>
                  ) : (
                    <div className="block h-full rounded overflow-hidden bg-white">
                      <div className="flex flex-col justify-between h-full">
                        {ProductContent}
                      </div>
                    </div>
                  )}
                </div>

              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

// Get Server-Side Data
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  let products = await Productdb.find({ category: 'mugs' });
  let mugs = {};

  for (let item of products) {
    if (item.title in mugs) {
      if (item.availableQty > 0) {
        // Colors: normalize to lowercase and add unique
        if (item.color) {
          if (Array.isArray(item.color)) {
            item.color.forEach((c) => {
              const cLower = c.toLowerCase();
              if (!mugs[item.title].color.includes(cLower)) {
                mugs[item.title].color.push(cLower);
              }
            });
          } else if (typeof item.color === 'string') {
            const cLower = item.color.toLowerCase();
            if (!mugs[item.title].color.includes(cLower)) {
              mugs[item.title].color.push(cLower);
            }
          }
        }

        // Sizes: normalize to uppercase and add unique
        if (item.size) {
          if (typeof item.size === 'string') {
            const sizeVal = item.size.trim().toUpperCase();
            if (!mugs[item.title].size.includes(sizeVal)) {
              mugs[item.title].size.push(sizeVal);
            }
          } else if (Array.isArray(item.size)) {
            item.size.forEach((s) => {
              if (typeof s === 'string') {
                const sizeVal = s.trim().toUpperCase();
                if (!mugs[item.title].size.includes(sizeVal)) {
                  mugs[item.title].size.push(sizeVal);
                }
              }
            });
          }
        }

        // Images: add unique
        if (item.img && !mugs[item.title].images.includes(item.img)) {
          mugs[item.title].images.push(item.img);
        }
      }
    } else {
      // First time seeing this title: clone the object
      mugs[item.title] = JSON.parse(JSON.stringify(item));

      // Normalize colors to lowercase array
      mugs[item.title].color = [];
      if (item.color) {
        if (Array.isArray(item.color)) {
          mugs[item.title].color = item.color.map((c) => c.toLowerCase());
        } else if (typeof item.color === 'string') {
          mugs[item.title].color = [item.color.toLowerCase()];
        }
      }

      // Normalize sizes to uppercase array
      if (item.size) {
        if (typeof item.size === 'string') {
          mugs[item.title].size = [item.size.trim().toUpperCase()];
        } else if (Array.isArray(item.size)) {
          mugs[item.title].size = item.size
            .filter((s) => typeof s === 'string')
            .map((s) => s.trim().toUpperCase());
        } else {
          mugs[item.title].size = [];
        }
      } else {
        mugs[item.title].size = [];
      }

      // Images array initialization
      mugs[item.title].images = item.img ? [item.img] : [];
    }
  }

  // Optional: Debug output to check final mugs structure
  // console.log("mugs aggregated:", mugs);

  return {
    props: { products: JSON.parse(JSON.stringify(mugs)) },
  };
}


export default Mugs;
