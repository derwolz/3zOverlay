import { createContext, useState } from "react";
export const WorkbenchContext = createContext();
export function WorkbenchProvider({children}){
    const [elements, setElements]=useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const saveElements = () =>{
        localStorage.setItem('elements', JSON.stringify(elements));
        setIsChanged(false);
    }
    function updateElements(newElements){
        setElements(newElements);
        setIsChanged(true);
    }
    return (
        <WorkbenchContext.Provider value={{elements, isChanged, saveElements, updateElements}}>
            {children}
        </WorkbenchContext.Provider>
    )
}