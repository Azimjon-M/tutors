import { useEffect, useState } from "react";
import { createContext } from "react";

export const SidebarContext = createContext({
    isOpen: false,
    changeOpen: () => {},
    setOpen: () => {},
    setClose: () => {},
    logOut: () => {},
});
const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // localstorage ga qarab sidbarni boshlang'ich holatini belgilaydi
    useEffect(() => {
        const isOpenFromStorage = localStorage.getItem("isOpen");
        setIsOpen(!!isOpenFromStorage);
    }, []);

    const setOpen = () => {
        setIsOpen(true);
        localStorage.setItem("isOpen", "open");
    };
    const setClose = () => {
        setIsOpen(false);
        localStorage.setItem("isOpen", "");
    };
    const changeOpen = () => {
        if (isOpen) {
            setClose();
        } else {
            setOpen();
        }
    };

    const logOut = () => {
        localStorage.clear();
    };
    return (
        <SidebarContext.Provider
            value={{ isOpen, changeOpen, setOpen, setClose, logOut }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
