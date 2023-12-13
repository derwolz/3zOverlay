import DragnDrop from "../../Utilities/DragnDrop.js/DragnDrop";
import Resizable from "../../Utilities/Resizable/Resizable";
import "./ImageDisplay.css"

export default function ImageDisplay({ pos, element }) {
    return (
        <Resizable>
            <DragnDrop>
                <img src={element.image} style={element.style} width={'100%'} height={"100%"} />
            </DragnDrop>
        </Resizable>
    )
}