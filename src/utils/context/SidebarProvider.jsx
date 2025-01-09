import { useState } from "react";
import { createContext } from "react";

export const SidebarContext = createContext(null);
const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const changeOpen = () => setIsOpen(prev => !prev);
    const setOpen = () => setIsOpen(true);
    const setClose = () => setIsOpen(false);
    return (
        <SidebarContext.Provider
            value={{ isOpen, changeOpen, setOpen, setClose }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
