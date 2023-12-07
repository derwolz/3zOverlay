
import { useRef, useEffect, useState } from "react";


export default function DragnDrop({pos, x,y, children }) {
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
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = (e) => {
        setDragging(false);
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


}
