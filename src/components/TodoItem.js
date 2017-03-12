//@flow
import React from 'react'
//static flow type
import type { TodoItemProps } from '../defTypes/TodoTypeDefs'

const TodoItem = ({ title, isCompleted, onItemClick, onItemDoubleClick, onItemRemove }:TodoItemProps) => (

  <li draggable
      onDoubleClick={onItemDoubleClick}
      onDragStart={onItemRemove}
      className={isCompleted ? 'list-group-item list-group-item-danger animated fadeIn'
                             : 'list-group-item list-group-item-success animated bounce'}>
    <input type="checkbox"
           defaultChecked={isCompleted}
           onClick={onItemClick} />
    {''}
    {title}
  </li>
)
export default TodoItem