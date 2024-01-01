import { useState, useRef } from "react";
import DragnDrop from "../../Utilities/DragnDrop.js/DragnDrop";
import Resizable from "../../Utilities/Resizable/Resizable";
import "./ImageDisplay.css"
import ImagePlaceHolder from "./ImagePlaceHolder";

export default function ImageDisplay({ pos, element }) {
    const [imageSrc, setImageSrc] = useState(element.image);
    const [position, setPosition] = useState(pos);

    //const [imageStyle, setImageStyle]= useState(JSON.parse(element.style))
    function setImage(image) {
        setImageSrc(image);
        element.image = image;

    }

    return (<div onDrop={(e) => { e.stopPropagation(); e.preventDefault() }}>
{element.image ?
        <DragnDrop pos={position}>
            <Resizable startSize={{ width: 100, height: 100 }}>
                    
                    <div style={{width:'100%', height:'100%', minWidth:'10px', minHeight:'10px', backgroundImage:`url(${imageSrc})`, backgroundSize:'cover'}}/>
                    
                
            </Resizable>
        </DragnDrop>
        : null
}
        <DragnDrop pos={pos} >
            {!element.image ? <ImagePlaceHolder setImage={setImage} /> : null}
        </DragnDrop>
    </div>
    )
}