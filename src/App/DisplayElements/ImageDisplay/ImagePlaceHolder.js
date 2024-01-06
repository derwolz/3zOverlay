
import { update } from '../../Utilities/EventUtils/EventUtils'
import './ImagePlaceHolder.css'
import { useState, useRef } from 'react'
export default function ImagePlaceHolder({setImage, element}){
    const [dragState, setDragState] = useState()
    const imageInputRef = useState(null)
    function handleClick(e){
        imageInputRef.current.click();
    }


    function captureFileChange(e){
        if (e.target.files && e.target.files[0]){
            const imgFile = e.target.files[0];
            const imageURL = URL.createObjectURL(imgFile);
            setImage(imageURL);
            update();
        }
    }

    function handleDrop(e){
        console.log('drop handled')
        const file = e.dataTransfer.files[0]
        const image = URL.createObjectURL(file)
        setImage(image);
        update();
    }

    function handleEnter(e){
        setDragState('drugOver');
        e.preventDefault();
    }
    function handleLeave(e){
        setDragState('');
    }

    return (
        <div className={'imagePlaceHolderContainer ' + dragState} onClick={handleClick} onDrop={(e)=>{handleDrop(e)}} onDragEnter={handleEnter} onDragLeave={handleLeave}>Drop Image here
            <input type='file' accept="image/*" style={{display:'none'}} ref={imageInputRef} onChange={captureFileChange}/>
        </div>

    )
}