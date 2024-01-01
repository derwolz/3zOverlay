
import {useRef, useState} from 'react';

export function TextInput({value, style, label}){
    const inputRef =  useRef(null);
    const [val, setVal] = useState(value);
    function handleChange(e){
        setVal(e.target.value);
        value = inputRef.current.innerHtml;
    }


    return(<div>
        <label>{label}</label>
        
        <input ref={inputRef} style={style} type='text' value={val} onChange={(e)=>handleChange(e)}/>
        
    </div>
    )
}