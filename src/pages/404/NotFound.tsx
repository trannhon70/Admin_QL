import { Link } from "react-router-dom";
import background from "assets/images/404/404.png";

function NotFound() {
    return (
        <div className="px-4">
            <div className="flex flex-col justify-center">
                <div className="max-w-2xl relative aspect-video">
                    <img
                        className="absolute h-full w-full object-contain"
                        src={background}
                        alt="background.png"
                    />
                </div>
                <div className="">
                    <div className="">
                        <h1 className="my-2 text-gray-800 font-bold text-2xl">
                            Looks like you've found the doorway to the great
                            nothing
                        </h1>
                        <p className="my-2 text-gray-800">
                            Sorry about that! Please visit our hompage to get
                            where you need to go.
                        </p>

                        <div className="relative rounded-s-lg bg-gradient-to-r from-indigo-600 via-indigo-300 to-white  text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 p-4 ">
                            Về trang chủ!
                            <Link
                                to="/"
                                className="absolute h-full w-full left-0 top-0"
                            ></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NotFound;
