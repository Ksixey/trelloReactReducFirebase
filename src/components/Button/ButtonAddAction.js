import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from '../Form/Form';
import PropTypes from 'prop-types';

const ButtonAddAction =({list, listId}) => {
    const [cardForm, setCardForm] = useState(false);
    
    const toggleForm = () => {
        setCardForm(prevState => !prevState)
    }

    const renderForm = () => {
        const placeholder = list ? 'Введите название заголовок' : 'Введите название карточки' ;
        const buttonTitle = list ?  'Добавьте колонку' : 'Добавьте карточку';
        const classNameForm = list ? 'formColumn' : 'formList';
        const boolList = list ? true : false;
        const listOrCard = list ? 'list' : 'card'
        return <Form placeholder={placeholder} listOrCard={listOrCard} listId={listId} boolList={boolList} classNameForm={classNameForm} buttonTitle={buttonTitle} toggleForm={()=>toggleForm()}/>
    }


    const renderButton = () => {
    const buttonText = list ?  'Добавить еще одну колонку' : 'Добавить еще одну карточку';
    const classNameButton = list ? 'buttonAddColumn' : 'buttonAddCard';
        return (
            <div className={classNameButton} onClick={()=> toggleForm()}>
                <span className={`${classNameButton}-icon`}>
                    <FontAwesomeIcon icon={faPlus} />
                </span> 
                <p className={`${classNameButton}-innerText`}>{buttonText}</p>
            </div>
        )
    }

    return(
    <>
        {
            cardForm ? 
            (renderForm()) : 
            (renderButton())
        }
    </>
    )
}

ButtonAddAction.propTypes = {
    listId: PropTypes.string,
    id: PropTypes.string,
};

ButtonAddAction.defaultProps = {
	listId:null,
    id: null,
};

export default ButtonAddAction;