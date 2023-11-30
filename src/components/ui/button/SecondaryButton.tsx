type SubProps = {
    fontSize?: string;
    background?: string;
    icon?: React.ReactNode;
    content?: string;
};

const SecondaryButton = ({
    className,
    background,
    fontSize,
    icon,
    content,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & SubProps) => {
    return (
        <>
            <button
                className={`flex items-center justify-center rounded-lg 
                leading-6 text-black-100 font-normal whitespace-nowrap 
                border border-gray-300 px-4 py-2
            ${className} 
            ${background || "hover:bg-gray-200"}
            ${fontSize || "lg:text-base text-sm"}
            `}
                {...props}
            >
                {icon}
                {content}
            </button>
        </>
    );
};

export default SecondaryButton;
