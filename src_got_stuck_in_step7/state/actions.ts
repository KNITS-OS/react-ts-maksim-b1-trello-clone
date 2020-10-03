// export type notesAction = { type: 'ADD', payload: string}

// export const addNoteAction = (note: string): notesAction => ({
//     type: 'ADD',
//     payload: note
// })

export type listAction = { type: 'ADD', payload: string }
export const addListAction = (listEntry: string) => ({
    type: 'ADD',
    payload: listEntry,
})



export type taskAction = { type: 'ADD', payload: { text: string, listId: string } }
export const addTaskAction = (taskEntry: string, listId: string) => ({ 
    type: 'ADD', 
    payload: {
        text: taskEntry,
        listId,
    }
})