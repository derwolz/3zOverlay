
import {useRef, useState} from 'react';
import { update } from '../../../Utilities/EventUtils/EventUtils';

export function TextInput({value,  label}){
    const inputRef =  useRef(null);
    const [val, setVal] = useState(value);
    function handleChange(e){
        setVal(e.target.value);
        update();
        //value = inputRef.current.innerHtml;
    }

    return(<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <label>{label}</label>
        
        <input style={{backgroundColor:'var(--purple-lightest)', border:'solid 1px var(--purple-mid)', borderRadius:'3px', marginLeft:'6px'}} ref={inputRef}  type='text' value={val} onChange={(e)=>handleChange(e)}/>
        
    </div>
    )
}