import React from 'react';
import app from '../../base'

const Header = () => {

    const logout = () => {
        return app.auth().signOut()
    }
    return (
        <div className="header">
            <button className="headerButton" onClick={()=>{logout()}}>Log out</button>
        </div>
    )
}

export default Header;