import React from 'react'
import Text from './blocks/Text'
import Img from './blocks/Img'
import Layer from './blocks/Layer'
import Button from './blocks/Button'

const BlockRenderer = ({ block }) => {
    switch (block.type) {
        case "layer":
            return <Layer {...block.props} x={block.x} y={block.y} />;
        case "text":
            return <Text {...block.props} x={block.x} y={block.y} />;
        case "img":
            return <Img {...block.props} x={block.x} y={block.y} />;
        case "button":
            return <Button {...block.props} x={block.x} y={block.y} />;
        default:
            return null;
    }
};
export default BlockRenderer
