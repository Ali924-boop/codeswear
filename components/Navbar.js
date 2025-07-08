import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const [dropdown, setDropdown] = useState(false)
    const toggleDropdown = () => {
        setDropdown(!dropdown)

    }

    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full")
            ref.current.classList.add("translate-x-0")
        }
        else if (!ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-0")
            ref.current.classList.add("translate-x-full")
        }
    }
    const ref = useRef()
    return (
        <div className="flex flex-col  md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 z-10 bg-white">
            <div className='logo mx-5'>
                <Link href={"/"}><Image src="/logo3.png" alt="Logo" width={150} height={50} className="h-20 w-40" /></Link>
            </div>
            <div className="nav">
                <ul className='flex items-center space-x-3 font-bold md:text-md'>
                    <Link href={"/tshirts"} className='hover:text-pink-600'><li>Tshirts</li></Link>
                    <Link href={"/hoodies"} className='hover:text-pink-600'><li>Hoodies</li></Link>
                    <Link href={"/stickers"} className='hover:text-pink-600'><li>Stickers</li></Link>
                    <Link href={"/mugs"} className='hover:text-pink-600'><li>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart absolute items-center right-0 mx-5 flex">
                <div
                    className="relative"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                >
                    {user.value && (
                        <MdAccountCircle className="text-xl md:text-2xl mt-2 cursor-pointer mx-2" />
                    )}

                    {/* Dropdown Menu */}
                    {dropdown && user.value && (
                        <div className="absolute right-0 top-8 bg-white shadow-lg border rounded-md px-5 w-32 z-50 ">
                            <ul className="py-2 text-sm font-bold">
                                <Link href={"/myaccount"}><li className="py-1 hover:text-pink-600 ">My Account</li></Link>
                                <Link href={"/orders"}><li className="py-1 hover:text-pink-600 ">Orders</li></Link>
                                <li onClick={logout} className="py-1 hover:text-pink-600 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
                {!user.value && <Link href={"/login"}>
                    <button className='bg-pink-600 px-2 py-1 mt-2 rounded-md text-sm text-white mx-2 cursor-pointer'>Login</button>
                </Link>}
                < AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-2xl cursor-pointer mt-2' />
            </div>

            {/* Sidebar */}

            <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll fixed top-0 right-0 bg-pink-100 py-10 px-8 z-50 transform  transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className='font-bold text-xl mb-4 text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
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
                </ol>

                <div className='font-bold my-2'>SubTotal: Rs {subTotal}</div>
                <div className="flex">
                    <Link href={"/checkout"}><button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                    <button onClick={clearCart} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer">Clear Cart</button>
                </div>
            </div>


        </div>
    )
}

export default Navbar 