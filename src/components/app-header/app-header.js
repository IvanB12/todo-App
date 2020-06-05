// eslint-disable-next-line
import React from 'react';
import './app-header.css'

const AppHeader = ({ todo, done }) => {//react component
    return (
        <div className='app-header d-flex'>
            <h1>  Todo list  </h1>
            <h2> {todo} to do, {done} is done  </h2>
        </div>)
}
export default AppHeader;

