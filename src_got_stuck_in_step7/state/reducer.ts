// const notesReducer = (state: notesState = initialState, action: notesAction) => {
//     switch(action.type) {
//         case 'ADD': {
//             return { ...state, notes: [...state.notes, action.payload] }
//         }
//         default: {
//             return state
//         }
//     }
// }

export const listReducer = (state: AppState, action: listAction)