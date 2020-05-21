import {ADD_CARD, DELETE_CARD, EDIT_CARD} from '../types/types'
import {cardAPI} from '../../API/api'
import {getLists} from './listActions'

const addCard = (id, payload) => ({
    type: ADD_CARD,
    payload, 
    listId: id
}) 

const deleteOneCard = (payload) => ({
    type: DELETE_CARD,
    payload
})

const editCard = (payload) => ({
    type: EDIT_CARD,
    payload
})

export const addCardAC = ({text}, id) => async(dispatch) => {
    const card = {
        text
    }
    const res = await cardAPI.addCard(card, id);

    const payload = Object.keys(res || []).map(key => {
        return {
            ...card,
            id:res[key]
        }
    })
    dispatch(addCard(id, payload))
}

export const removeCardAC = (idColumn, idCard) => async(dispatch) => {
    await cardAPI.deleteCard(idColumn, idCard);
    const payload = {idColumn, idCard};
    return Promise.all([dispatch(deleteOneCard(payload)),dispatch(getLists())]);
}

export const editCardAC = (idColumn, idCard, {text}) => async(dispatch) => {
    await cardAPI.editCard(idColumn,idCard,text)
    const payload = {idColumn, idCard, text}
    return Promise.all([dispatch(editCard(payload)),dispatch(getLists())]);
}