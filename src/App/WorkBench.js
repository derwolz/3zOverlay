import { useState } from 'react';
import DragnDrop from './Utilities/DragnDrop.js/DragnDrop';
import './WorkBench.css'
import AddMenu from './UXComponents/AddPanel/AddMenu';
import PropertiesMenu from './UXComponents/PropertyPanel/PropertiesMenu';
import { templates } from './DisplayElements/templates';
import { DisplayElements } from './DisplayElements/DisplayElements';

export function WorkBench(){
    const [mousePos, setMousePos] = useState({x:0, y:0})
    const [contextPos, setContextPos] = useState({x: 0, y: 0});
    const [showContextMenu, setShowContextMenu] = useState(null);
    const [showPropertiesMenu, setPropertiesMenu] = useState(null);
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
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
    function addElement(type){

        setElements([...elements, {element: structuredClone(templates[type]), Gui:DisplayElements[type]}])

        console.log(elements);
    }
    function removeElement(element){

    }
    return(
        <div className="workbench-body" onContextMenu={handleRightClick} onMouseMove={handleMouseMove} onClick={(e)=>selectElement(e,null)} onDrop={(e)=>{e.stopPropagation();;e.preventDefault()}} onDragOver={(e)=>{e.preventDefault()}}>
            
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