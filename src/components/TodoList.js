//@flow
import React from 'react'
//static flow type
import type { TodoListProps } from '../defTypes/TodoTypeDefs'

const TodoList = ({ children, onItemFilter, onItemSort, sortType }:TodoListProps) => {

  let sortTypeIndex: number = ['', 'asc', 'desc'].findIndex(
    value => value === sortType
  )

  // Render TodoList
  return (
    <div style={{marginTop:20}}>
      <button className={(sortTypeIndex === 0)?'btn btn-default':'btn btn-success'}
              onClick={()=>{onItemSort((sortType==='asc')?'desc':'asc')}}
              disabled={(React.Children.count(children))?false:true}>
        Sort By strokes：{['', 'ASC', 'DESC'][sortTypeIndex]}
      </button>
      {'  '}
      <label>
        <input type="checkbox"
               defaultChecked
               onClick={onItemFilter} />
        Completed Included
      </label>
      <ul className="list-group">
        {children}
      </ul>
    </div>
  )
}


export default TodoList