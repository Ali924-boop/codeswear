import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Order = () => {
  return (
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #65823</h1>
       
        <p className="leading-relaxed mb-4 text-green-500 ">Your Order is Succesfully Placed.</p>

         <div className="flex mb-4">
          <a className="flex-grow text-center text-indigo-500 py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow  text-center py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow  text-center py-2 text-lg px-1">Item Total</a>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Wear the code (XL/YELLOW)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">Rs 58.00</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Wear the code (XL/YELLOW)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">Rs 58.00</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">Wear the code (XL/YELLOW)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">Rs 58.00</span>
        </div>
        <div className="flex flex-col">
          <span className="title-font font-medium text-2xl text-gray-900">SubTotal: Rs 174.00</span>
          <div className="my-6">
          <button className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded cursor-pointer">Track Order</button>
          </div>
        </div>
      </div>
      <Image width={400} height={400} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-center rounded" src="https://m.media-amazon.com/images/I/811eARoYMYL.__AC_SY445_SX342_QL70_FMwebp_.jpg"/>
    </div>
  </div>
</section>
  )
}

export default Order