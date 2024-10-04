import React, { useState } from "react";
import authservice from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice";
import Button from "./Button";
import Input_1 from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup(){
    const navigate = useNavigate();
    const [error, seterror] = useState("");
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const create = async(data)=>{
        seterror("")
        try {
            const path = await authservice.createAccount(data);
            if(path){
                const userData = await authservice.getCurrentUser()
                if(userData)  dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            seterror(error.message)
        }
    }
    return(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width = "100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p>
                    Already have an account?&nbsp;
                    <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                    >Sign In</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input_1 
                        label = "Name"
                        placeholder = "Enter your name"
                        {... register("name",{
                            required:true
                        })}
                        />
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
                        >Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Signup