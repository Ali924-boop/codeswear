import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react'


const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState()
  const [city, setCity] = useState()
  const [disabled, setDisabled] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "phone") setPhone(value);
    else if (name === "address") setAddress(value);
    else if (name === "pincode") setPincode(value);
  }

  useEffect(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [name, email, phone, address, pincode])

  const initiatePayment = async () => {
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": Math.random(),
        "token": "",
        "tokenType": "TXN_TOKEN",
        "amount": "subTotal",
      },
      "handler": {
        "nottifyMerchant": function (eventName, data) {
          console.log("nottifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };

    window.Easypaisa.CheckoutJS.init(config).then(function onSuccess() {
      window.Easypaisa.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });
  };


  return (
    <div className='container px-2 sm:m-auto'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Complete your purchase on Codeswear with secure checkout and payment method." />
        <meta name="author" content="Ali Raza Sandha" />
        <meta name="keywords" content="Ecommerce, Checkout, Payment, Codeswear" />
        <Script type="applicaion/javascript" crossOrigin='anonymous' src={``} />
      </Head>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="Address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address} name="address" id="Address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="coty" className="leading-7 text-sm text-gray-600">City</label>
            <input value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
      <div className="sideCart bg-pink-100 m-2 p-6">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your Cart is Empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-4">
                <div className="font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant}) </div>
                <div className="flex font-semibold items-center justify-center w-1/3 text-lg"><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /></div>
              </div>
            </li>
          })}
          <span className='font-bold'>SubTotal: Rs {subTotal}</span>
        </ol>
      </div>
      <div className="mx-3">
        <Link href={"/checkout"}>
          <button disabled={disabled}
            onClick={initiatePayment}
            className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer"
          >
            <BsFillBagCheckFill className="m-1" />
            Pay Rs {subTotal}
          </button></Link>
      </div>


    </div>
  )
}

export default Checkout