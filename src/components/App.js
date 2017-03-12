//@flow
import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import TodoAddForm from './TodoAddForm'
import TodoEditForm from './TodoEditForm'
import TodoSearchForm from './TodoSearchForm'

//static flow type
import type { Item, SortType } from '../definitions/TodoTypeDefinition.js'

//import css
import '../style/bootstrap.css'
import '../style/animate.css'

//defined default-variables
let keepSearchedItems: Array<Item> = []
let isSearching: boolean = false
let isFilteringOut: boolean = false

class App extends Component {
  // default state settings
  state: {
    items: Array<Item>,
    sortType: SortType,
  }

  //constructor
  constructor() {
    super()

    this.state = {
      items: [],
      sortType: ''
    }
  }

  //region json server use
  //Event - override componentDidMount
  componentDidMount() {
    //ready to load server data
    this.handleServerItemsLoad()
  }

  //Event - ServerItemsLoad
  handleServerItemsLoad = () => {
    fetch('http://localhost:5555/items?_sort=title&_order=ASC', {
      method: 'GET'
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText)

        return response.json()
      })
      .then((itemList) => {

        const items = itemList.map((item) => {
          return Object.assign({}, item, { isEditing: false })
        })

        this.setState({
          items,
        })
      })
      .catch((error) => console.log(error))
  }

  //Event - ServerItemAdd
  handleServerItemAdd = (aItem: Item) => {

    //get aItem
    const { id, title, isCompleted } = aItem
    //set aItem to payload
    const payload = { id, title, isCompleted }

    fetch('http://localhost:5555/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {

        if (!response.ok) throw new Error(response.statusText)

        return response.json()
      })
      .then((item) => {
        console.log('add item success', item)
      })
      .catch((error) => console.log(error))
  }

  //Event - ServerItemUpdate
  handleServerItemUpdate = (aItem: Item) => {

    const { id, title, isCompleted } = aItem
    const payload = { id, title, isCompleted }

    fetch(`http://localhost:5555/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText)

        return response.json()
      })
      .then((item) => {
        console.log('update item', item)
      })
      .catch((error) => console.log(error))
  }

  //Event - ServerItemRemove
  handleServerItemRemove = (aItem: Item) => {

    const { id } = aItem

    const payload = { id }

    fetch(`http://localhost:5555/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText)

        return response.json()
      })
      .then((item) => {
        console.log('delete item', aItem)
      })
      .catch((error) => console.log(error))
  }
  //endregion

  //Event - ItemAdd
  handleItemAdd = (aItem: Item) => {

    this.handleItemSort('')

    const newItems = [aItem, ...this.state.items]

    //add Item to server
    this.handleServerItemAdd(aItem)

    //render items
    this.setState({
      items: newItems,
    })
  }

  //Event - StylingItem
  handleStylingItem = (index: number) => {

    this.handleItemSort('')

    const newItems = [...this.state.items]

    //isCompleted exchange
    newItems[index].isCompleted = !newItems[index].isCompleted

    //update item to server
    this.handleServerItemUpdate(newItems[index])

    //render items
    this.setState({
      items: newItems,
    })
  }

  //Event - EditItem
  handleEditItem = (index: number) => {

    const newItems = [...this.state.items]

    //isEditing exchange
    newItems[index].isEditing = !newItems[index].isEditing

    //render items
    this.setState({
      items: newItems,
    })
  }

  //Event - EditItemUpdate
  handleEditItemUpdate = (index: number, title: string) => {

    this.handleItemSort('')

    const newItems = [...this.state.items]

    //update data after editing
    newItems[index].title = title

    //isEditing exchange
    newItems[index].isEditing = !newItems[index].isEditing

    //update item to server
    this.handleServerItemUpdate(newItems[index])

    //render items
    this.setState({
      items: newItems,
    })
  }

  //Event - ItemSearch
  handleItemSearch = (searchword: string) => {

    this.handleItemSort('')

    // copy items to keepSearchedItems
    // isSearch = true
    if (!isSearching) {
      isSearching = true
      keepSearchedItems = [...this.state.items]
    }

    // isSearching = true,and searchword = '' -> isSearching = false (search finished)
    // copy keepSearchedItems to items
    if (isSearching && searchword === '') {
      isSearching = false

      this.setState({
        items: keepSearchedItems,
      })

    } else {
      //filter items to newItems
      const newItems = keepSearchedItems.filter((item) => (
        item.title.includes(searchword)
      ))

      //render items
      this.setState({
        items: newItems,
      })
    }
  }

  //Event - ItemFilter
  handleItemFilter = () => {

    //isFilteringOut exchange
    isFilteringOut = !isFilteringOut

    const newItems = [...this.state.items]

    //render items
    this.setState({
      items: newItems,
    })
  }

  //Event - ItemSort
  handleItemSort = (sortType: SortType) => {

    let newItems = [...this.state.items]

    if (sortType === 'asc') {
      //asc sort by strokes
      newItems = newItems.sort((a, b) => (
          a.title.localeCompare(b.title, 'zh-Hans-TW-u-co-stroke')
        )
      )
    }

    if (sortType === 'desc') {
      //desc sort by strokes
      newItems = newItems.sort((a, b) => (
          b.title.localeCompare(a.title, 'zh-Hans-TW-u-co-stroke')
        )
      )
    }

    this.setState({
      items: newItems,
      sortType
    })
  }

  //Event - ItemDelete
  handleItemRemove = (index: number) => {

    this.handleItemSort('')

    const newItems = [...this.state.items]

    const removeItem = newItems[index]

    const remainItems = newItems.filter((item) => {
      return item.id !== removeItem.id
    })

    console.log('removeItem', removeItem)
    console.log('remainItems', remainItems)

    this.handleServerItemRemove(removeItem)

    this.setState({
      items: remainItems,
    })

  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">TodoApp</h3>
            </div>
            <div className="panel-body">
              <TodoAddForm placeholderText="項目文字寫在這，按Enter鍵可以加入列表中" onItemAdd={this.handleItemAdd} />
              <TodoSearchForm placeholderText="搜尋" onItemSearch={this.handleItemSearch} />
              <TodoList onItemFilter={this.handleItemFilter} onItemSort={this.handleItemSort}
                        sortType={this.state.sortType}>
                {
                  this.state.items.map((item, index) => {
                      if (isFilteringOut && item.isCompleted) {
                        return null
                      }
                      return (
                        (item.isEditing)
                          ? <TodoEditForm
                            key={item.id}
                            title={item.title}
                            onItemUpdate={(title) => { this.handleEditItemUpdate(index, title) }}
                          />
                          : <TodoItem
                            key={item.id}
                            isCompleted={item.isCompleted}
                            title={item.title}
                            onItemDoubleClick={() => { this.handleEditItem(index) }}
                            onItemClick={() => { this.handleStylingItem(index) }}
                            onItemRemove={()=>{this.handleItemRemove(index)}}
                          />
                      )
                    }
                  )
                }
              </TodoList>
            </div>
            <div className="panel-footer">'Double-Click' to Edit,then 'Enter' to Save</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
