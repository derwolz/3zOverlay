import './PropertiesMenu.css';
import { Properties } from '../components/RightSideBar/properties';
//import { textdisplay } from '../components/RightSideBar/templates';
import DragnDrop from '../DragnDrop';
export default function PropertiesMenu({pos,element={}}){

    return (
        <DragnDrop pos={pos}>
        <div className="RightSideBar">
            <div className="border"/>
            <Properties selectedElement={{}}/>
        </div>
        </DragnDrop>
    )
}