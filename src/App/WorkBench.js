import { useState, useEffect, useContext, useRef } from 'react';
import DragnDrop from './Utilities/DragnDrop.js/DragnDrop';
import './WorkBench.css'
import AddMenu from './UXComponents/AddPanel/AddMenu';
import PropertiesMenu from './UXComponents/PropertyPanel/PropertiesMenu';
import { templates } from './DisplayElements/templates';
import { DisplayElements } from './DisplayElements/DisplayElements';
import { WorkbenchContext } from './Utilities/ContextProvider/ContextProvider';

export function WorkBench() {

    // ------------------------------ Variables ------------------------------------------

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [contextPos, setContextPos] = useState({ x: 0, y: 0 });
    const [showContextMenu, setShowContextMenu] = useState(null);
    const [showPropertiesMenu, setPropertiesMenu] = useState(null);
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const { updateElements, loadElements, savedElements } = useContext(WorkbenchContext);
    const saveElementsRef = useRef(elements);

    // ---------------------------- Element CRUD ----------------------------------------

    function addElement(type) {
        const newElement = structuredClone(templates[type])
        newElement.pos = contextPos;
        setElements([...elements, { element: newElement, Gui: DisplayElements[type] }])
        updateElements();
    }
    function loadFromProvider() {

    }
    useEffect(() => {
        const fetchElements = async () => {
            if (saveElementsRef.current.length === 0) {
                try {
                    const elems = await loadElements();
                    for (const elem of elems) {
                        console.log('loading element', elem.element);
                        console.log('loading Type', elem.element.type);
                        console.log('restoring function', DisplayElements[elem.element.type])
                        setElements([...elements, { element: elem.element, Gui: DisplayElements[elem.element.type] }])
                    }

                }
                catch (err) {
                    console.log(err);
                }
            }


        }
        fetchElements();

    
    }, [])
function removeElementSelectedElement() {
    setElements(elements.filter(e => e.element !== selectedElement));
    setSelectedElement(false);
    updateElements()
}

// Calls the update on the App's Context so we can store it in local storage when we save
function saveElements() {
    updateElements(saveElementsRef.current);
}

useEffect(() => {
    saveElementsRef.current = elements;
}, [elements]);

// --------------------------------- Controls --------------------------------------

function handleRightClick(e) {
    e.preventDefault();
    setShowContextMenu(!showContextMenu);
    setContextPos({ ...mousePos })
}

function handleMouseMove(e) {
    setMousePos({ x: e.clientX, y: e.clientY })
}

function handleCloseMenu() {
    setShowContextMenu(false);
}

function selectElement(e, element) {
    if (element) { e.stopPropagation(); }
    console.log(element);
    setSelectedElement(element);

}

useEffect(() => {
    function handleKeyPress(e) {

        console.log(e.key);
        if (e.key === 'Delete') {
            e.preventDefault();
            removeElementSelectedElement();
        }

    }
    function handleUpdate() {
        setTimeout(() => {
            saveElements();
        }, 300)

    }
    window.addEventListener('update', handleUpdate);
    window.addEventListener('keydown', handleKeyPress)
    return () => {

        window.removeEventListener('keydown', handleKeyPress)
        window.removeEventListener('update', handleUpdate);
    }
}, []);

// -------------------------------- Component --------------------------------------------

return (
    <div className="workbench-body" onContextMenu={handleRightClick} onMouseMove={handleMouseMove} onClick={(e) => selectElement(e, null)} onDrop={(e) => { e.stopPropagation(); e.preventDefault() }} onDragOver={(e) => { e.preventDefault() }} >

        {elements.map(({ Gui, element }, id) => {
            console.log('attempting to display Gui:',elements);
            return (<div key={id} onClick={(e) => selectElement(e, element)}>
                <Gui pos={contextPos} element={element} />
            </div>
            );
        })}
        {showContextMenu ? <AddMenu pos={mousePos} handleCloseMenu={handleCloseMenu} handleAddElement={(element) => addElement(element)} /> : null}
        {selectedElement ? <PropertiesMenu pos={mousePos} element={selectedElement} /> : null}

    </div>
)
}
