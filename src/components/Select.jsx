import React, { forwardRef, useId } from "react";

const Select_1 = forwardRef(function Select({
    options,
    label,
    className,
    ...props
},ref){
    const  id = useId();
    return(
        <div className="w-full">
            {label && <label htmlFor={id}></label>}
            <select
            {...props}
            id = {id}
            ref = {ref}
            className={`px-3 py-1 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-bg-gray-20 w-full ${className}`}
            >
                {options ?.map((option)=>(
                    <option key = {option} value = {option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select_1