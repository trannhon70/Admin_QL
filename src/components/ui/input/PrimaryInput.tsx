import { nanoid } from "nanoid";

const PrimaryInput = ({
    className,
    icon,
    placeholder,
    onChange,
    type,
    label,
    disabled,
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

            <input
                type={`${type ? type : "text"}`}
                onChange={onChange}
                id={`input_${inputId}`}
                className="border border-gray-300 rounded-md w-full py-2 px-3"
                {...buttonProps}
                disabled={disabled ? disabled : false}
            ></input>
        </div>
    );
};

export default PrimaryInput;
