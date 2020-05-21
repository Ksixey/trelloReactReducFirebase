import React from 'react';
import {useDispatch} from 'react-redux';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {addList, editColumnAC} from '../../store/actions/listActions';
import {addCardAC, editCardAC} from '../../store/actions/cardActions';
import PropTypes from 'prop-types';

const Form = ({
    placeholder, 
    buttonTitle, 
    toggleForm, 
    classNameForm, 
    listId, 
    text, 
    editTitle, 
    listOrCard, 
    cards, 
    editCard,
    idCard}) => {
    const dispatch = useDispatch()

    return(
        <div>
            <Formik 
            initialValues={{text: '' || text }}
            validate={values => {
                const errors = {};
                if (!values.text) {
                    errors.text = 'Required';
                } 
                return errors;
            }}
            onSubmit={values => {
                if(listOrCard === 'list' ){
                    dispatch(addList(values));
                }else if(editTitle){
                    dispatch(editColumnAC(values, listId, cards))
                }
                else if(editCard){
                    dispatch(editCardAC(listId, idCard ,values))
                }
                else{
                    dispatch(addCardAC(values,listId))
                }
                toggleForm()

            }}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit
                })=> (
                    <form className={classNameForm} onSubmit={handleSubmit}>
                        <textarea
                        className="textarea"
                        autoFocus
                        name="text"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.text}
                        placeholder={placeholder}
                        />
                        {errors.text ? <div className="errorContainer">{errors.text}</div>: null}
                        <div className="formBottom">
                            <button className="buttonForm" type="submit">
                                {buttonTitle}
                            </button>
                            <span onClick={toggleForm} className="closeButton">
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </div>
                    </form>
                )}

            </Formik>
        </div>
    )
}

Form.propTypes = {
    placeholder: PropTypes.string.isRequired, 
    buttonTitle: PropTypes.string.isRequired, 
    toggleForm: PropTypes.func.isRequired, 
    classNameForm: PropTypes.string.isRequired, 
    listId: PropTypes.string, 
    text: PropTypes.string, 
    editTitle: PropTypes.bool, 
    listOrCard: PropTypes.string, 
    cards: PropTypes.arrayOf(PropTypes.object), 
    editCard: PropTypes.bool,
    idCard: PropTypes.string,
    id: PropTypes.string,
};

Form.defaultProps = {
	text: '',
    editTitle: false,
    editCard: false,
    listOrCard: null,
    cards: null,
    idCard: null,
    listId: null
};

export default Form;