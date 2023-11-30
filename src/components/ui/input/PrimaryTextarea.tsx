import { nanoid } from "nanoid";

const PrimaryTextarea = ({
    className,
    icon,
    placeholder,
    onChange,
    type,
    label,
    ...buttonProps
}: any) => {
    const inputId = nanoid();
    return (
        <div className={`${className || ""}`}>
            {label ? (
                <label htmlFor={`input_${inputId}`}>{label}</label>
            ) : (
                <></>
            )}

            <textarea
                type={`${type ? type : "text"}`}
                onChange={onChange}
                id={`input_${inputId}`}
                className="border border-gray-300 rounded-md focus-visible:outline-none w-full py-2 px-3"
                {...buttonProps}
            ></textarea>
        </div>
    );
};

export default PrimaryTextarea;
