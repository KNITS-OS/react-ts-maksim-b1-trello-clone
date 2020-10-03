import React, { useRef } from 'react'
import { CardContainer } from '../styles'
import { useDrop } from 'react-dnd'
import { useAppState } from '../state/AppStateContext'
import { CardDragItem } from '../utils/DragItem'
import { useItemDrag } from '../utils/useItemDrag'

type CardProps = {
    id: string,
    columnId: string,
    text: string,
    key?: string,
    index: number,
    isPreview?: boolean,
}

export const Card = ({ text, index, columnId, id }: CardProps) => {

    const { state, dispatch } = useAppState()
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({ type: "COLUMN", id, index, text })
    const [, drop] = useDrop({
        accept: "CARD",
        hover(item: CardDragItem) {
            if (item.id === id) { 
                return 
            }

            const dragIndex = item.index
            const hoverIndex = index
            const sourceColumn = item.columnId
            const targetColumn = columnId

            dispatch({
                type: "MOVE_TASK",
                payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
            })
            item.index = hoverIndex
            item.columnId = targetColumn
        }
    })

    drag(drop(ref))

    return (
        <CardContainer>{text} </CardContainer>
    )
    
}