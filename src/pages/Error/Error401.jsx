import { useEffect, useState } from "react";
import bg from "../../assets/fon/login.png";
import { Box, Context, Image } from "./style";
import { useNavigate } from "react-router-dom";

const Error401 = () => {
    const message =
        "Xaavfsizlik maqsadida saytga qaytadan kirmaguncha undan foydalana olmaysiz";
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
                        Ooops <span className="font-digital">401</span>
                    </p>
                    <h1 className="text-4xl font-bold max-md:text-center">
                        HOZIRCHA MAVJUD EMAS!!!
                    </h1>
                    <p className="mt-4">{text}</p>
                    <button
                        onClick={() => navigate("/login")}
                        hidden={hidden}
                        className="border border-[#314b7c] text-[#314b7c] bg-transparent py-2 px-4 rounded-lg mt-4 hover:bg-[#314b7c] hover:text-white active:bg-[#26365b] transition duration-300"
                    >
                        Ro'yxatdan o'tish
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

export default Error401;
