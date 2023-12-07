import './AddMenu.css';
import GuiCreationButton from './GuiButtons/GuiButton';
import { templates } from '../components/RightSideBar/templates';
import DragnDrop from '../DragnDrop';
export default function AddMenu( {pos,handleCloseMenu, handleAddElement}){
    function close(e){
        e.stopPropagation();
        handleCloseMenu();
    }
    function addElement(element){
        handleAddElement(element);
    }
    
    return (
        <DragnDrop pos={pos}>
        <div className="LeftSideBar">
            {Object.keys(templates).map((elementname, key)=>{
                return (<div key={key} onClick={(e)=>{addElement(elementname); close(e)}} ><GuiCreationButton close={close} text={elementname} image={templates[elementname].icon}/></div>)
            })}
            <div className="border"/>
        </div>
        </DragnDrop>
    )
}