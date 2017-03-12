//@flow
import React from 'react'
//static flow type
import type { TodoAddFormProps } from '../defTypes/TodoTypeDefs'

const TodoAddForm = ({ placeholderText, onItemAdd }:TodoAddFormProps) => {

  let titleField: any = null

  // Render TodoAddForm
  return (
    <div>
      <input className="form-control"
             type="text"
             ref={el=>titleField=el}
             placeholder={placeholderText}
             onKeyPress={
               (e)=>{
                      if(titleField.value.trim()
                          && e.target instanceof HTMLInputElement
                          && e.key==='Enter'){

                            onItemAdd({
                              id:+new Date(),
                              title:titleField.value,
                              isCompleted:false,
                              isEditing:false,
                            })

                            titleField.value = ''
                        }
                    }
             }
      />
    </div>
  )
}

export default TodoAddForm