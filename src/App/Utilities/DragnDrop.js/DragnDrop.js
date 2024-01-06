
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { update } from "../EventUtils/EventUtils";

const DragnDrop = forwardRef(({pos, x,y, children, saveCallback}, ref)=> {
    const dragRef = useRef(null);


    const [position, setPosition] = useState({ x: pos.x || x, y: pos.y || y });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        e.preventDefault()
        setDragging(true);
        setOffset({
            x: e.clientX - dragRef.current.getBoundingClientRect().left,
            y: e.clientY - dragRef.current.getBoundingClientRect().top,
        });
    };

    const handleMouseMove = (e) => {
        e.preventDefault()
        if (dragging) {
            const pos = {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            }
            setPosition(pos);
            if (saveCallback){
                saveCallback(pos);
            }
            
        }
    };

    const handleMouseUp = (e) => {
        setDragging(false);
        update();
    };


    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);
    return (<div 
        style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: 'pointer',
        }}
        ref={dragRef}
        onMouseDown={handleMouseDown}
    >
        {children}
        </div>
    )


});
export default DragnDrop;