import React, {useContext} from 'react';
import { Formik } from 'formik';
import {useHistory, Redirect} from 'react-router-dom';
import app from '../../base';
import {AuthContext} from './Auth'

const AuthForm = ({login}) => {

    const history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const redirectSignUp = () => {
        return history.push('/signup')
    }

    if(currentUser){
        return <Redirect to={"/"} />
    }
    return (
        <div className="authFormContainer">
            <div className="formWrapper">
            <h3 className="title">{login ? 'Login' : 'Sign Up'}</h3>
            <Formik 
                    initialValues={{email: '', password:''}}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }else if (!values.password){
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={values => {
                        if(login){
                            app
                            .auth()
                            .signInWithEmailAndPassword(values.email, values.password)
                            history.push("/")
                            
                        }else{
                            app.auth().createUserWithEmailAndPassword(values.email, values.password)
                            history.push("/")
                        }
                        }
                    }
                    >
                        {({
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        })=> (
                            <form onSubmit={handleSubmit}>
                                <input
                                className="inputField"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email'
                                />
                                {errors.email ? <div className="errorContainer">{errors.email}</div>: null}
                                <input
                                className= "inputField"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password'
                                />
                                {errors.password ? <div className="errorContainer">{errors.password}</div>: null}
                                {errors.errorMailOrPassword? <div className="errorContainer">{errors.errorMailOrPassword}</div> : null}
                                <div className="formBottom">
                                    <button className="buttonAuth" type="submit">
                                        {login? 'Login':'SignUp'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                    {login && 
                    <div>
                        <p>Do you have account? <button className="buttonAuth"  onClick={()=>redirectSignUp()}>Create account</button> </p>
                    </div>}
            </div>
        </div>
    )
}

export default AuthForm;