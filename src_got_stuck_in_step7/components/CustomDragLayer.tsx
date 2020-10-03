import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import { ColumnContainer } from '../styles'
import { Column } from './Column'
import { Card } from './Card'

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {

    if (!currentOffset) {return { display: "none" }}

    const { x, y } = currentOffset
    const transform = `translate(${x}px, ${y}px)`
    
    return {
        transform,
        WebkitTransform: transform
    }
}

export const CustomDragLayer = () => {

    const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
    }))

    if (!isDragging) {return null}

    return (
        <ColumnContainer>
            <div style={getItemStyles(currentOffset)}>
                {item.type === 'COLUMN' ? (
                    <Column
                        id={item.id}
                        text={item.text}
                        index={item.index}
                        isPreview={true}
                    />
                ) : (
                    <Card
                        id={item.id}
                        columnId={item.columnId}
                        text={item.text}
                        index={0}
                        isPreview={true}
                    />
                )}
            </div>
        </ColumnContainer>
    )
      
}