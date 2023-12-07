import { useEffect, useState } from "react"
import { guiButtonElements } from "../../GuiElements/GuiButtons/guiButtonElements"
import { TextInput } from "./components/TextInput"
import { DropDown } from './components/DropDown'
import { ColorSelector } from './components/ColorSelector'
import { NumberInput} from './components/NumberInput.js';
export function Properties({ selectedElement={gui:''} }) {
    const components = {
        'TextInput': TextInput,
        'DropDown': DropDown,
        'ColorSelector': ColorSelector,
        'NumberInput': NumberInput
    };

    const renderComponent = (item, key) => {
        const Component = components[item.type];
        if (!Component) return null;
        const props = item.props || {};
        return <Component key={key} {...props} />;
    };

    return (
        <div>
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