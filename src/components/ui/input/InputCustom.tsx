import { useEffect, useState } from "react";

type SubProps = {
    fontSize?: string;
};

const InputCustom = ({
    onChange,
    placeholder,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & SubProps) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (props?.value) setIsActive(true);
    }, []);
    return (
        <div
            className="relative"
            data-te-input-wrapper-init
            data-te-input-state-active
        >
            <input
                type="text"
                className="
               peer 
               block 
               min-h-[auto] 
               w-full 
               rounded-xl 
               border 
               border-primary-600 
               bg-transparent 
               px-3 
               py-[0.32rem] 
               leading-[1.6] 
               outline-none 
               transition-all 
               duration-200 
               ease-linear 
               focus:placeholder:opacity-100 
               peer-focus:text-gray-700 
               data-[te-input-state-active]:placeholder:opacity-100 
               motion-reduce:transition-none 
               dark:text-primary-700 
               dark:placeholder:text-gray-800 
               dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id={`exampleFormControlInput-${placeholder}`}
                placeholder={placeholder}
                onChange={(e) => {
                    setIsActive(e.target.value ? true : false);
                    onChange && onChange(e);
                }}
                {...props}
            />
            <label
                htmlFor={`exampleFormControlInput-${placeholder}`}
                className={`
                  pointer-events-none 
                  absolute 
                  left-3 
                  top-0 
                  mb-0 
                  max-w-[90%] 
                  origin-[0_0] 
                  truncate pt-[0.37rem] 
                  leading-[1.6] 
                  text-primary-700
                  transition-all 
                  duration-200 
                  ease-out
                  peer-focus:-translate-y-[0.9rem]
                  peer-focus:scale-[0.8] 
                  peer-focus:text-primary-700 
                  peer-focus:bg-white 
                  peer-focus:px-1
                  motion-reduce:transition-none 
                  dark:text-gray-500 dark:peer-focus:text-primary-700 
                  ${
                      isActive
                          ? "-translate-y-[0.9rem] scale-[0.8] bg-white px-1"
                          : ""
                  }
                  peer-data-[te-input-state-active]:-translate-y-[0.9rem]
                  peer-data-[te-input-state-active]:scale-[0.8] 
               `}
            >
                {placeholder}
            </label>
        </div>
    );
};

export default InputCustom;
