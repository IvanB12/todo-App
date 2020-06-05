// eslint-disable-next-line
import React from 'react';

import TodoListItem from '../todo-list-item/'
import './todo-list.css'



const ToDoList = ({ todos, onDeleted,
    onToggleImportant,
    onToggleDone }) => {// передаем свойство из App
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;// мы группируем все элементы
        // вместе, создавая новые объект, которые включает в себя только
        // нужные нам свойства
        return (// создаем константу, раскладывающую массив на элементы, 
            // каждый из них является  свойством создающим отдельный
            // для отдельного элемента спискаTodoListItem
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                />
            </li>
        );
    });
    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>)
    // сдесь мы просто передаем эту константу в качестве того,
    // что будет отобраться для отдельных пунктов списка
    // label -свойство компонента props.
    // important - булеан, который тоже свойство компонента props.
    // эти свойства используются в другом компоненте, для прописывания 
    // признаков отдельного item в списке todo
}
export default ToDoList;