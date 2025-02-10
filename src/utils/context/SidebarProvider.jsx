import { useState } from "react";
import { createContext } from "react";

export const SidebarContext = createContext({
    isOpen: true,
    changeOpen: () => {},
    setOpen: () => {},
    setClose: () => {},
    logOut: () => {},
});
const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

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
