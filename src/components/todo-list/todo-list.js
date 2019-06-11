import React from 'react';
import ToDoListItem from '../todo-list-item/todo-list-item'
import './todo-list.css'

const ToDoList=({todos,onDeleted,onToggleImportant,onToggleDone})=>{
    const elements=todos.map((item)=>{
        const {id,...itemProps}=item;
    return(<li key={id } className="list-group-item"><ToDoListItem 
    {...itemProps} onDeleted={()=>{onDeleted(id)}} 
    onToggleDone={()=>onToggleDone(id)} 
    onToggleImportant={()=>onToggleImportant(id)}/>
            {/* <li><ToDoListItem label={item.label} important={item.important}/></li> тоже самое что через спред оператор*/}
            </li>);
    });
    return(<ul className="list-group todo-list">
        {elements}     
     </ul>);
};
export default ToDoList;
