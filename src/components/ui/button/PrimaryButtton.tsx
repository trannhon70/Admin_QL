type SubProps = {
    fontSize?: string;
    background?: string;
    icon?: React.ReactNode;
    content?: string;
};

const PrimaryButton = ({
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
                className={`flex items-center justify-center 
                rounded-lg leading-6 text-white font-normal
                whitespace-nowrap hover:opacity-70 px-4 py-2
            ${className} 
            ${background || "bg-gradient-to-r from-primary-500 to-primary-800"}
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

export default PrimaryButton;
