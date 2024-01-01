import './PropertiesMenu.css';
import { Properties } from './Properties/properties';
//import { textdisplay } from '../components/RightSideBar/templates';
import DragnDrop from '../../Utilities/DragnDrop.js/DragnDrop';
export default function PropertiesMenu({pos,element={}}){
    return (
        <DragnDrop pos={{x:pos.x + 100,y: pos.y}}>
        <div className="RightSideBar" onClick={(e)=>{e.stopPropagation();}}>
            <Properties selectedElement={element}/>
        </div>
        </DragnDrop>
    )
}