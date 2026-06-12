import React from "react";
import * as IconsFa from 'react-icons/fa';
import * as IconsMd from 'react-icons/md';

// 1. Combinamos las librerías de iconos
const IconLibraries = { ...IconsFa, ...IconsMd };

type IconName = keyof typeof IconLibraries;


interface DynamicIconProps {
  iconName: IconName | string; 
  size?: number;
  color?: string;
}

export const DynamicIcon = ({
  iconName,
  size = 14,
  color = 'black'
}: DynamicIconProps) => {
    
    
    const IconComponent = IconLibraries[iconName as IconName];

    if (!IconComponent) {
        return <IconsFa.FaQuestionCircle size={size} color={color} />;
    }

    return <IconComponent size={size} color={color} />;
};