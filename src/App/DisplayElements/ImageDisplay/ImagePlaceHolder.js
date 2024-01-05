
import './ImagePlaceHolder.css'
import { useState } from 'react'
export default function ImagePlaceHolder({setImage}){
    const [dragState, setDragState] = useState()
    function handleClick(e){
        //Stop propogation for now, but it needs to open the porperties dialog so a URL can be set.
        //e.stopPropagation();
        // introduce logic that allowss the upload and reading and validation of an image file. via a URL
        // allow for drag and drop functionality on an image display

    }
    function sendImage(){

    }
    function handleDrop(e){
        console.log('drop handled')
        const file = e.dataTransfer.files[0]
        const image = URL.createObjectURL(file)
        setImage(image);
    }
    function handleCapture(e){
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
            
        </div>

    )
}