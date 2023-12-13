import { useState } from "react";
import "./Resizable.css";
export default function Resizable({ children }) {
    const [rect, setRect] = useState(null);
    
    return (
        <div className={"ResizableBox"} style={rect}>
            <div className={"BoxRow"}>
                <span className={"BorderAnchor"} />
                <span className={"BorderAnchor"} />
                <span className={"BorderAnchor"} />
            </div>
            <div className={"BoxRow"}>
                {children}
            </div>
            <div className={"BoxRow"}>
                <span className={"BorderAnchor"} />
                <span className={"BorderAnchor"} />
                <span className={"BorderAnchor"} />
            </div>
        </div>
    )
}