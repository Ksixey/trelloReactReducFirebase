import * as axios from 'axios';
import app from '../base';

let url = app.options_.databaseURL;

const instance = axios.create({
    baseURL: `${url}`,
})

export const cardAPI = {
    editCard(idColumn,idCard,text){
        return instance.put(`/lists/${idColumn}/cards/${idCard}.json`, {text, id: idCard}).then(response => response.data)
    },
    deleteCard(idColumn, idCard){
        return instance.delete(`/lists/${idColumn}/cards/${idCard}.json`).then(response => response.data)
    },
    addCard(card, id){
        return instance.post(`/lists/${id}/cards.json`, card).then(response => response.data)
    }
}

export const columnAPI = {
    getColumns(){
        return instance.get('/lists.json').then(response => response.data)
    },
    editColumn(text,listId,cards){
        return instance.put(`/lists/${listId}.json`, {text, listId,cards }).then(response => response.data)
    },
    removeColumn(id){
        return instance.delete(`/lists/${id}.json`).then(response => response.data)
    }, 
    addColumn(list){
        return instance.post('/lists.json', list).then(response => response.data)
    }
}