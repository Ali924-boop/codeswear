import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
      if(localStorage.getItem('token')){
        router.push('/')
      }
    }, [])
    

    const handleChange = (e) => {
       if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {email, password }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
    
        setEmail('')
        setPassword('')
        if(response.success){
            localStorage.setItem('token', response.token)
        toast.success('Your are successfully logged in', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
        setTimeout(()=>{
            router.push(`${process.env.NEXT_PUBLIC_HOST}`)
        }, 1000);
        }
        else {
            toast.error(response.error, {
            position: "top-left",
            autoClose: 2000,
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
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <ToastContainer
                    position="bottom-left"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}
                  />
            <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                <Link href={"/"} className="flex items-cente" >
                    <Image width={150} height={200} className="items-center" src="/logo3.png" alt="logo" />
                </Link>
                <div className="w-full bg-white rounded-lg mb-[10vh] shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handleChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                
                                <Link href={"/forgot"} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password ?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href={"/signup"} className="font-medium text-blue-500 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login