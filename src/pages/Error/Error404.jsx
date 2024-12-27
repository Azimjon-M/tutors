import { useEffect, useState } from "react";
import bg from "../../assets/fon/astro1.png";
import { Box, Context, Image } from "./style";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const message =
        "Siiz qidirayotgan sahifani topa olmadik, sahifa mavjud emasga o'xshaydi";
    const [text, setText] = useState("");
    const [hidden, setHidden] = useState(true);
    const typingSpeed = 50;
    const navigate = useNavigate();

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < message.length - 1) {
                setText(prev => prev + message[index]);
                index++;
            } else {
                clearInterval(interval);
                setHidden(false);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [message]);

    return (
        <div className="w-screen h-full flex justify-center items-center">
            <Box className="flex m-auto px-8">
                <Context>
                    <p>
                        Ooops <span className="font-digital">404</span>
                    </p>
                    <h1 className="text-4xl font-bold max-md:text-center">
                        SAHIFA TOPILMADI
                    </h1>
                    <p className="mt-4">{text}</p>
                    <button
                        onClick={() => navigate("/")}
                        hidden={hidden}
                        className="border border-[#314b7c] text-[#314b7c] bg-transparent py-2 px-4 rounded-lg mt-4 hover:bg-[#314b7c] hover:text-white active:bg-[#26365b] transition duration-300"
                    >
                        Bosh sahifa
                    </button>
                </Context>
                <Image
                    src={bg}
                    alt="astronaunt"
                    className="max-w-20 max-md:hidden"
                />
            </Box>
        </div>
    );
};

export default Error404;
