import { useState, useRef } from "react";
import DragnDrop from "../../Utilities/DragnDrop.js/DragnDrop";
import Resizable from "../../Utilities/Resizable/Resizable";
import "./ImageDisplay.css"
import ImagePlaceHolder from "./ImagePlaceHolder";

export default function ImageDisplay({ pos, element }) {
    const [imageSrc, setImageSrc] = useState(element.image);
    const [size, setSize] = useState(element.size);
    const [position, setPosition] = useState(element.pos);
    const positionRef = useRef(null)
    //const [imageStyle, setImageStyle]= useState(JSON.parse(element.style))
    function setImage(image) {
        setImageSrc(image);
        element.image = image;

    }
    function saveImageDisplay(){

    }
    function toJSON(){

    }
    function sizeCallback(sz){
        setSize(sz);
        element.size=sz;
    }
    function positionCallBack(pos){
        setPosition(pos);
        element.pos=pos;
    }

    return (<div onDrop={(e) => { e.stopPropagation(); e.preventDefault() }}>
{element.image ?
        <DragnDrop pos={position} saveCallback={positionCallBack} ref={positionRef}>
            <Resizable startSize={size} saveCallback={sizeCallback}>
                    
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