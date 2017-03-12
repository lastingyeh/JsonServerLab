//@flow
import React from 'react'
//static flow type
import type { TodoSearchFormProps } from '../defTypes/TodoTypeDefs'

const TodoSearchForm = ({ placeholderText, onItemSearch }:TodoSearchFormProps) => {

  let titleField: any = null

  let isOnComposition: boolean = false

  // check as if Chrome browser
  const isChrome = !!window.chrome && !!window.chrome.webstore

  // Event - handleComposition
  const handleComposition = (e: KeyboardEvent) => {

    // user had type to inputs completed
    if (e.type === 'compositionend') {

      isOnComposition = false

      if (e.target instanceof HTMLInputElement && !isOnComposition && isChrome) {

        onItemSearch(titleField.value)
      }

    } else {
      isOnComposition = true
    }
  }

  // Render TodoSearchForm
  return (
    <div>
      <input className="form-control"
             type="text"
             ref={el=>titleField = el}
             placeholder={placeholderText}
             onCompositionStart={handleComposition}
             onCompositionUpdate={handleComposition}
             onCompositionEnd={handleComposition}
             onChange={
               (e:KeyboardEvent)=>{

                 if(e.target instanceof HTMLInputElement && !isOnComposition){
                   onItemSearch(titleField.value)
                 }
               }
             } />
    </div>
  )
}

export default TodoSearchForm