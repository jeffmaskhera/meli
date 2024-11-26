import React from 'react';
import {LabelColorEnum} from "./label.enum";


interface LabelProps {
    text: string;
    color: LabelColorEnum.ORANGE; //default
}

const LabelButton: React.FC<LabelProps> = ({ text, color })=> {
    return (
        <div className={`label label__color-${color}`}>
            {text}
        </div>
    );
};

export default LabelButton;
