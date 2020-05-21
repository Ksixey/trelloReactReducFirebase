import {columnAPI} from '../../API/api'
import {ADD_LIST,REMOVE_LIST, SHOW_LISTS, EDIT_LIST} from '../types/types'

const takeAllLists = (payload) => ({
    type: SHOW_LISTS,
    payload
})

const deleteOneList =(id) => ({
    type: REMOVE_LIST,
    payload: id
})

const addNewList =(payload) => ({
    type: ADD_LIST,
    payload
})

const editColumn = (payload) => ({
    type: EDIT_LIST,
    payload
})

export const getLists = () => async(dispatch) => {
    const res = await columnAPI.getColumns();
    
    const payload = Object.keys(res || []).map(key => {
        const cards = res[key].cards
        return {
            ...res[key],
            cards: Object.keys(cards || []).map(cardKey => {
                return {
                ...cards[cardKey],
                id: cardKey
                }
            }),
            id:key
        }
    })
    
    dispatch( takeAllLists(payload))

}

export const addList = ({text}) => async(dispatch) => {
    const list = {
        text
    }
    const res = await columnAPI.addColumn(list);
    const payload = {
        ...list,
        id: res.name
    }
    dispatch(addNewList(payload))
}

export const removeList = (id) => async(dispatch) => {
    await columnAPI.removeColumn(id);
    dispatch(deleteOneList(id))
}

export const editColumnAC = ({text}, listId, cards) => async(dispatch) => {
    await columnAPI.editColumn(text, listId,cards);
    const payload ={id:listId, text: text, cards: cards}
    return Promise.all([dispatch(editColumn(payload)) , dispatch(getLists())])

}
