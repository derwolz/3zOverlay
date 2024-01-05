import { useEffect, useState } from "react"
import { guiButtonElements } from "../../GuiButtons/guiButtonElements.js"
import { TextInput } from "../UIPropertyComponents/TextInput.js"
import { DropDown } from '../UIPropertyComponents/DropDown.js'
import { ColorSelector } from '../UIPropertyComponents/ColorSelector.js'
import { NumberInput} from '../UIPropertyComponents/NumberInput.js';
import "./properties.css"
export function Properties({ selectedElement={gui:''} }) {
    const components = {
        'TextInput': TextInput,
        'DropDown': DropDown,
        'ColorSelector': ColorSelector,
        'NumberInput': NumberInput,
    };

    const renderComponent = (item, key) => {
        const Component = components[item.type];
        if (!Component) return null;
        console.log(item);
        
        return <div style={{margin: '2.5px 0px'}}><Component  key={key} value={item.value} values={item.values} style={item.style} label={item.label} element={item}/></div>;
    };

    return (
        <div className={"properties-container"}>
            {Object.keys(selectedElement.gui).map(key => {
                const item = selectedElement.gui[key];
                if (Array.isArray(item)) {
                    return item.map((subItem, index) => {
                        renderComponent(subItem, `${key}-${index}`)});
                } else if (typeof item === 'object' && item !== null) {
                    return Object.keys(item).map(subKey => renderComponent(item[subKey], `${key}-${subKey}`));
                }

                return null;
            })}
        </div>
    );
}