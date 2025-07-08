import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import mongoose from "mongoose"
import Productdb from '../../models/Productdb'
import { ToastContainer, toast, Slide } from 'react-toastify';

const Post = ({ buyNow, addToCart, product, variants }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()

  const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL']

  // Extract valid sizes from all variants
  const validSizes = Array.from(
    new Set(
      Object.values(variants)
        .flatMap((colorVariants) => Object.keys(colorVariants))
    )
  ).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))

  // Set initial size and color
  const getFirstValidCombo = () => {
    for (let size of validSizes) {
      const colorForSize = Object.keys(variants).filter(color => variants[color][size])
      if (colorForSize.length > 0) {
        return { size, color: colorForSize[0] }
      }
    }
    return { size: '', color: '' }
  }

  const initial = getFirstValidCombo()
  const [size, setSize] = useState(initial.size)
  const [color, setColor] = useState(initial.color)

  // Refresh variant: updates URL slug without full reload, changes route with new variant slug
  const refreshVariant = (newColor, newSize) => {
    if (variants[newColor] && variants[newColor][newSize]) {
      const newSlug = variants[newColor][newSize].slug
      router.push(`/product/${newSlug}`)
    }
  }

  // When color or size changes, update the URL slug accordingly
  useEffect(() => {
    if (color && size) {
      refreshVariant(color, size)
    }
  }, [color, size])

  const checkServiceability = async () => {
    let pins = await fetch("/api/pincode")
    let pinJson = await pins.json()

    if (pinJson.pincodes.includes(parseInt(pin))) {
      setService(true)
      toast.success('Your Pincode is Serviceable !', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } else {
      setService(false)
      toast.error('Sorry, Pincode not Serviceable !', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  }


  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  useEffect(() => {
    // When size changes, find first color available for that size
    const validColorsForSize = Object.keys(variants).filter((col) => variants[col][size])
    if (!validColorsForSize.includes(color)) {
      if (validColorsForSize.length > 0) {
        setColor(validColorsForSize[0])
      } else {
        setColor('')
      }
    }
  }, [size, variants])

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-4 sm:px-6 lg:px-20 py-16 mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-16 items-center lg:items-start">
          <div className="w-full lg:w-1/2 px-8 lg:px-0 mb-10 lg:mb-0">
            <Image
              width={200}
              height={200}
              alt="ecommerce"
              className="mx-auto rounded object-cover"
              src={product.img}
            />
          </div>

          <div className="w-full lg:w-1/2 px-4 lg:px-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">CODESWEAR</h2>
            <h1 className="text-gray-900 text-3xl sm:text-4xl font-medium mb-3">{product.title} ({product.size}/{product.color})</h1>
            <div className="flex mb-6 items-center space-x-3">
              {[...Array(4)].map((_, i) => (
                <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ))}
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 text-pink-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="text-gray-600 ml-2 text-sm">4 Reviews</span>
            </div>
            <p className="leading-relaxed mb-8">{product.desc}</p>

            {/* Color + Size Selector */}
            <div className="flex flex-col sm:flex-row sm:space-x-10 mb-8">
              {/* Colors */}
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="mr-4 font-semibold">Color:</span>
                <div className="flex space-x-3">
                  {Object.keys(variants).map((col) => {
                    if (variants[col][size]) {
                      return (
                        <button
                          key={col}
                          className={`w-8 h-8 rounded-full border-2 focus:outline-none ${color === col ? 'border-black' : 'border-gray-300'}`}
                          style={{ backgroundColor: col }}
                          onClick={() => setColor(col)}
                          aria-label={`Select color ${col}`}
                        ></button>
                      )
                    }
                    return null
                  })}
                </div>
              </div>

              {/* Size */}
              <div className="flex items-center">
                <span className="mr-4 font-semibold">Size:</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="rounded border border-gray-300 py-2 px-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base"
                  aria-label="Select size"
                >
                  {validSizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-8">
              <span className="text-2xl sm:text-3xl font-semibold text-gray-900">Rs {product.price}</span>
              <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="mt-4 sm:mt-0 px-10 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded focus:outline-none transition">
                Buy Now
              </button>
              <button
                onClick={() => {
                  toast.success('Your Cart Added !', {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                  }); addToCart(slug, 1, product.price, product.title, size, color)
                }}
                className="mt-4 sm:mt-0 px-10 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded focus:outline-none transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Pincode Check */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
              <input
                onChange={onChangePin}
                type="text"
                placeholder="Enter your Pincode"
                className="w-full sm:w-85 py-1.5 px-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              <button
                onClick={checkServiceability}
                className="mt-2 sm:mt-0 px-4 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-2xl rounded transition"
              >
                Check
              </button>
            </div>

            {service === false && (
              <p className="mt-3 text-red-600 text-sm">Sorry! We do not deliver to this pincode yet.</p>
            )}
            {service === true && (
              <p className="mt-3 text-green-600 text-sm">Yay! This pincode is serviceable.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI)
  }

  const product = await Productdb.findOne({ slug: context.query.slug })
  const variants = await Productdb.find({ title: product.title, category: product.category })

  let colorSizeSlug = {}

  for (let item of variants) {
    let colorValues = Array.isArray(item.color) ? item.color : [item.color]
    let sizeValues = Array.isArray(item.size) ? item.size : [item.size]

    for (let color of colorValues) {
      const lowerColor = typeof color === 'string' ? color.toLowerCase() : ''
      for (let size of sizeValues) {
        const upperSize = typeof size === 'string' ? size.toUpperCase() : ''
        if (!colorSizeSlug[lowerColor]) {
          colorSizeSlug[lowerColor] = {}
        }
        colorSizeSlug[lowerColor][upperSize] = { slug: item.slug }
      }
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  }
}

export default Post
