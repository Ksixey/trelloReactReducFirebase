import React, {useState} from 'react';
import KanbanCard from '../KanbanCard/KanbanCard';
import {useDispatch} from 'react-redux';
import ButtonAddAction from '../Button/ButtonAddAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {removeList} from '../../store/actions/listActions';
import Form from '../Form/Form'
import PropTypes from 'prop-types';

const KanbanList = ({listId, title, cards}) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const toggleForm = () => {
        setEdit(prevState => !prevState)
    }

    const renderHeader = () => {
        return (
            <div className="headerForm">
                <span className="closeButton" onClick={() => dispatch(removeList(listId))}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                    <h4 className="column-header" onDoubleClick={()=>toggleForm()}>{title}</h4>
            </div>
        )
    }

    const renderForm = () => {
        return <Form 
        editTitle 
        listId={listId} 
        cards={cards}  
        toggleForm={()=>toggleForm()} 
        classNameForm="headerForm" 
        text={title} 
        placeholder="Введите текст"
        buttonTitle="Редактировать"/>
    }

    return (
        <div className="column">
            {edit ?
                (renderForm()) :  
                (renderHeader())
            }
            {cards && cards.map((card, index) => <KanbanCard key={card.id} index={index} id={card.id} listId={listId} text={card.text} />)}
            <ButtonAddAction listId={listId} />
        </div>
    )
}

KanbanList.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    listId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

KanbanList.defaultProps = {
	cards: null,
};


export default KanbanList;