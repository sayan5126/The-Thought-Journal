import React from "react";
import { useState } from "react";
import { authService } from "../appwrite/authService"
import { Link, useNavigate } from "react-router-dom"
import { set, useForm } from "react-hook-form"
import { Button, Input, Logo } from "./index"
import { login } from "../store/authSlice"
import { useDispatch } from "react-redux";

function Signup() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className="flex items-center justify-center w-full"
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                    <h2 className="text-center text-2xl font-bold leading-tight">create your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have any account?&nbsp;
                        <Link
                            to="/signin"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                </div>
                <form onSubmit={handleSubmit(signup)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            type="text"
                            {...register("fullName",
                                {
                                    required = true
                                }
                            )}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            placeholder="Enter password"
                            type="password"
                            {...register("password", {
                                required: true,
                                matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value) ||
                                    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
                            })}
                        />
                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
