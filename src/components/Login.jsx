import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../store/authslice";
import Button from "./Button";
import Input_1 from "./Input";
import Logo from "./Logo"
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Login_1(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, seterror] = useState("");
    const login1 = async(data)=>{
        seterror("")
        try {
            const session = await authservice.login(data)
            if(session){
                const userData = await authservice.getCurrentUser()
                if(userData)  dispatch(authlogin(userData))
                navigate("/");
            }
        } catch (error) {
            seterror(error.message)
        }
    }
    return(
        <div
        className="flex item-center justify-center w-full"
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width = "100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p>
                    Don&apos;t have any account?&nbsp;
                    <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                    >Sign Up</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login1)} className="mt-8">
                    <div className="space-y-5">
                        <Input_1
                        label = "Email: "
                        placeholder = "Enter your email"
                        type = "email"
                        {...register("email",{
                            required: true,
                            validate :{
                                matchPatern:(value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input_1 
                        label = "Password: "
                        type = "password"
                        placeholder = "Enter your password"
                        {...register("password",{
                            required:true,
                        })}
                        />
                        <Button
                        type="submit"
                        className="px-4 py-2 rounded-lg"
                        >Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login_1