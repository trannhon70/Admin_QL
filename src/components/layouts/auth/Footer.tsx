import footerBg from "assets/images/layout/footer.png";

export default function Footer() {
    return (
        <div className="min-w-[250px]">
            <img
                src={footerBg}
                alt="footer.png"
                className="w-full h-[185px]"
            ></img>
        </div>
    );
}
