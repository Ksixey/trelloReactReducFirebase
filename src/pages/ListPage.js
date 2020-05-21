import React, {useEffect} from 'react';
import KanbanList from '../components/KanbanList/KanbanList'
import { useSelector, useDispatch } from 'react-redux';
import ButtonAddAction from '../components/Button/ButtonAddAction';
import {getLists} from '../store/actions/listActions';
import Header from '../components/Header/Header'

const ListPage =() => {
    const lists = useSelector(state => state.listReducer.lists);
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(getLists())
    }, [dispatch]);
    
    return(
      <>
      <Header/>
      <div className="row">
        <div className="columns">
          {lists.map(list =>(
            <KanbanList key={list.id} listId={list.id} title={list.text} cards={list.cards}/>
          ))}
        </div>
        <ButtonAddAction list/>
      </div>
      </>
    )
}

export default ListPage;