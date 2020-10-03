import React, { useRef } from 'react'
import { ColumnContainer, ColumnTitle, NewItemFormContainer } from '../styles'
import { Card } from './Card'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../state/AppStateContext'
import { useItemDrag } from '../utils/useItemDrag'
import { useDrop } from 'react-dnd'
import { DragItem } from '../utils/DragItem'
import { isHidden } from '../utils/isHidden'

type ColumnProps = {
    text: string,
    index: number,
    id: string,
    isPreview?: boolean,
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {

    const { state, dispatch } = useAppState()
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({ type: "COLUMN", id, index, text })
    const [, drop] = useDrop({
        accept: "COLUMN",
        hover(item: DragItem) {
            if (item.type === "COLUMN") {
                const dragIndex = item.index
                const hoverIndex = index

                if (dragIndex === hoverIndex) {
                    return
                }
                dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex} })
                item.index = hoverIndex
            }
        }
    })

    drag(drop(ref))

    return (
        <ColumnContainer ref={ref} isPreview={isPreview} isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}>
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map(
                (task, i) => (<Card text={task.text} key={task.id} index={i} />)
            )}            
            <NewItemFormContainer>
                <AddNewItem
                    toggleButtonText="+ Add another task"
                    dark
                    onAdd={ text => dispatch({
                        type: "ADD_TASK",
                        payload: { text, listId: id }
                    })}
                />
            </NewItemFormContainer>
        </ColumnContainer>
    )
}