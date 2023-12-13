import './PropertiesMenu.css';
import { Properties } from './Properties/properties';
//import { textdisplay } from '../components/RightSideBar/templates';
import DragnDrop from '../../Utilities/DragnDrop.js/DragnDrop';
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