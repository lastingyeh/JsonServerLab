//@flow
import React from 'react'

//static flow type
import type { TodoEditFormProps } from '../defTypes/TodoTypeDefs'

const TodoEditForm = ({ title, onItemUpdate }: TodoEditFormProps) => {

  //for input ref uses
  let titleField: any = null

  return (
    <li className="list-group-item">
      <input
        type="text"
        defaultValue={title}
        ref={el => { titleField = el }}
        autoFocus
        onBlur={(e) => {
            if (titleField.value.trim()
                && e.target instanceof HTMLInputElement) {

              onItemUpdate(titleField.value)
            }
          }
        }
        onKeyPress={(e) => {
            if (titleField.value.trim()
                && e.target instanceof HTMLInputElement
                && e.key === 'Enter') {

              onItemUpdate(titleField.value)
            }
          }
        }
      />
    </li>
  )
}

export default TodoEditForm