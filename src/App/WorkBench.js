import { useState, useEffect } from 'react';
import DragnDrop from './Utilities/DragnDrop.js/DragnDrop';
import './WorkBench.css'
import AddMenu from './UXComponents/AddPanel/AddMenu';
import PropertiesMenu from './UXComponents/PropertyPanel/PropertiesMenu';
import { templates } from './DisplayElements/templates';
import { DisplayElements } from './DisplayElements/DisplayElements';
import { WorkbenchContext } from './Utilities/ContextProvider/ContextProvider';

export function WorkBench(){
    
    // ------------------------------ Variables ------------------------------------------

    const [mousePos, setMousePos] = useState({x:0, y:0})
    const [contextPos, setContextPos] = useState({x: 0, y: 0});
    const [showContextMenu, setShowContextMenu] = useState(null);
    const [showPropertiesMenu, setPropertiesMenu] = useState(null);
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const {updateElements} = useContext(WorkbenchContext);


    // ---------------------------- Element CRUD ----------------------------------------

    function addElement(type){
        const newElement = structuredClone(templates[type])
        newElement.pos = contextPos;
        setElements([...elements, {element: newElement, Gui:DisplayElements[type]}])
        saveElements()
        console.log(elements);
    }
    
    function removeElementSelectedElement(){
        setElements(elements.filter(e => e.element !== selectedElement));
        setSelectedElement(false);
        saveElements();
    }
    
    // Calls the update on the App's Context so we can store it in local storage when we save
    function saveElements(){
        updateElements(elements);
    }
    

    // --------------------------------- Controls --------------------------------------
    
    function handleRightClick(e){
        e.preventDefault();
        setShowContextMenu(!showContextMenu);
        setContextPos({...mousePos})
    }
    
    function handleMouseMove(e){
        setMousePos({x:e.clientX, y:e.clientY})
    }
    
    function handleCloseMenu(){
        setShowContextMenu(false);
    }
    
    function selectElement(e, element){
        if (element) {e.stopPropagation();}
        console.log(element);
        setSelectedElement(element);
        
    }

    useEffect(()=>{
        function handleKeyPress(e){
            e.preventDefault();
            console.log(e.key);
            if (e.key === 'Delete'){
                removeElementSelectedElement();
            }
            
        }
        window.addEventListener('keydown', handleKeyPress)
        return () =>{

            window.removeEventListener('keydown', handleKeyPress)
        }
    },[])


    // -------------------------------- Component --------------------------------------------
    
    return(
        <div className="workbench-body" onContextMenu={handleRightClick} onMouseMove={handleMouseMove} onClick={(e)=>selectElement(e,null)} onDrop={(e)=>{e.stopPropagation();e.preventDefault()}} onDragOver={(e)=>{e.preventDefault()}} onKeyDown={handleKeyUp}>
            
            {elements.map(({Gui, element}, id)=>{
                return(<div key={id} onClick={(e)=>selectElement(e,element)}>
                    <Gui pos={contextPos} element={element}/>
                    </div>
                );
            })}
            {showContextMenu ? <AddMenu pos={mousePos} handleCloseMenu={handleCloseMenu} handleAddElement={(element)=>addElement(element)}/> : null}
            {selectedElement ? <PropertiesMenu pos={mousePos} element={selectedElement}/>: null}
            
        </div>
    )
}