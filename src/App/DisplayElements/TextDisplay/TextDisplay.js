import DragnDrop from "../../Utilities/DragnDrop.js/DragnDrop"
export default function TextDisplay( {pos, element} ){


    return (
        <DragnDrop pos={pos}>
            <span style={element.style} >{element.text}</span>      
        </DragnDrop>
    )
}
/**/