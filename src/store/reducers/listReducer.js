import {ADD_LIST, REMOVE_LIST, SHOW_LISTS,EDIT_LIST, ADD_CARD,  DELETE_CARD, EDIT_CARD} from '../types/types'
const initialState = {
    lists: []
};

const listReducer = (state = initialState, {type, payload, listId}) => {
    switch(type){
        case SHOW_LISTS:
        return {...state, lists: payload}
        case ADD_LIST:
            return {...state, lists: [...state.lists, payload]}
        case EDIT_LIST:
            return {...state, lists:[ state.lists.find(list =>  {
                if( list.id === payload.id){
                    return {
                        ...list,
                        text: payload.text
                    }
                }else{
                    return list
                }
            })]}     
        case EDIT_CARD:
            return {...state, lists: [state.lists.find(list => {
                if(list.id === payload.idColumn){
                    return list.cards.find(card => {
                        if(card.id === payload.idCard){
                            return {
                                id: payload.idCard,
                                text: payload.text
                            }
                        }else{
                            return card
                        }
                    })
                }else{
                    return list
                }
            })]}
        case REMOVE_LIST:
            return {...state, lists: state.lists.filter(list => list.id !== payload)}
        case DELETE_CARD:
            return {...state, lists:  state.lists.find(list =>list.id === payload.idColumn).cards.filter(card => card.id !== payload.idCard)}
        case  ADD_CARD:
            return {...state, lists: state.lists.map(list => {
                if(list.id === listId){
                    if(!list.cards) {
                        return {
                            ...list,
                            cards: payload
                        }
                    }else {
                        return {
                            ...list,
                            cards: [...list.cards, payload[0]]
                        }
                    }
                }
                else{
                    return list;
                }
            })}    
        default: 
        return state
    }
}

export default listReducer;