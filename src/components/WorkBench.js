import { useState } from 'react';
import DragnDrop from './DragnDrop';
import './WorkBench.css'
import AddMenu from './GuiElements/AddMenu';
import PropertiesMenu from './GuiElements/PropertiesMenu';
import { templates } from './components/RightSideBar/templates';
import { DisplayElements } from './components/DisplayComponents/DisplayElements';

export function WorkBench(){
    const [mousePos, setMousePos] = useState({x:0, y:0})
    const [contextPos, setContextPos] = useState({x: 0, y: 0});
    const [showContextMenu, setShowContextMenu] = useState(null);
    const [showPropertiesMenu, setPropertiesMenu] = useState(null);
    const [elements, setElements] = useState([]);
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
    function handleClick(e){
        setPropertiesMenu(!showPropertiesMenu);
    }
    function addElement(type){

        setElements([...elements, {element: structuredClone(templates[type]), Gui:DisplayElements[type]}])

        console.log(elements);
    }
    function removeElement(element){

    }
    return(
        <div className="workbench-body" onContextMenu={handleRightClick} onMouseMove={handleMouseMove} onClick={handleClick}>
            
            {elements.map(({Gui, element}, id)=>{
                console.log('gui',Gui, element);
                return(
                    <Gui pos={contextPos} element={element}/>
                );
            })}
            {showContextMenu ? <AddMenu pos={mousePos} handleCloseMenu={handleCloseMenu} handleAddElement={(element)=>addElement(element)}/> : null}
            {showPropertiesMenu ? <PropertiesMenu pos={mousePos} element={{}}/>: null}
        </div>
    )
}