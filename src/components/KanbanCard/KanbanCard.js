import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux';
import {removeCardAC} from '../../store/actions/cardActions';
import Form from '../Form/Form';
import PropTypes from 'prop-types';

const KanbanCard = ({text, id, listId}) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const toggleForm = () => {
        setEdit(prevState => !prevState)
    }

    const renderCard = () => {
        return (
            <div onDoubleClick={()=> toggleForm()} className="card" >
                <p className="card-text">{text}</p>
                <span className="card-icon" onClick={() => dispatch(removeCardAC(listId, id))}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </div>
        )
    }

    const renderForm = () => {
        return <Form 
        editCard
        listId={listId} 
        idCard={id}
        text={text}
        toggleForm={()=>toggleForm()} 
        classNameForm="headerForm" 
        placeholder="Введите текст"
        buttonTitle="Редактировать"/>
    }
    
    return(
    <>
        {
            edit? (renderForm()) : (renderCard())
        }
    </>
    )
}

KanbanCard.propTypes = {
    id: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};


export default KanbanCard;