import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import ItemAddForm from '../item-add-form';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import './app.css'
export default class App extends Component{
    maxId=100;
    state = {
        todoData:[
        ],
        filter:'all',
        term:''
    };
    createToDoItem(label){
        return {
            label,
            important:false, 
            done:false,
            id:this.maxId++
        };
    }
    deleteItem=(id)=>{
        this.setState(({todoData})=>{
           const idx=todoData.findIndex((el)=>el.id===id); 
           
           const newArray=[
               ...todoData.slice(0,idx),...todoData.slice(idx+1)
            ];

            return {
                todoData:newArray
            }
        });
    };
    addItem=(text)=>
    {
        const newItem=this.createToDoItem(text);
        this.setState(({todoData})=>
        {
        const newArr=[...todoData,newItem];

        return {
            todoData: newArr
            }
        });
    };
    onSearchChange=(term)=>{
        this.setState({term});
    }
    onFilterChange=(filter)=>{
        this.setState({filter});
    }
    toggleProperty(arr,id,propName){
            const idx=arr.findIndex((el)=>el.id===id); 
            const oldItem=arr[idx];
            const newItem={...oldItem,[propName]:!oldItem[propName]};
          return[
                ...arr.slice(0,idx),
                newItem,
                ...arr.slice(idx+1)
             ]
    }
    onToggleImportant=(id)=>{
        this.setState(({todoData})=>{
          return{
              todoData:this.toggleProperty(todoData,id,'important')
          }
         });   
    }
    onToggleDone=(id)=>{
        this.setState(({todoData})=>{
            
            return{
                todoData:this.toggleProperty(todoData,id,'done')
            }
           }); 
    };
    doneTodo=()=>{
        this.setState(({todoData})=>
        {
        const newArr=todoData.filter((el)=>el.done);
        
        return {
            todoData: newArr
            }
        });
    }
    search(items,term){
        if(term.length===0){
            return items;
        }
        return items.filter((item)=>{
            return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase())>-1;
        });
    }
    filter(items,filter){
        switch(filter){
            case 'all':
            return items;
            case 'active':
                return items.filter((item)=>!item.done);
            case 'done':
                return items.filter((item)=>item.done)
            default:
                return items;
        }
    }
    render(){
        const {todoData,term,filter}=this.state;
        const visibleItem=this.filter(this.search(todoData,term),filter);
        const doneCount=todoData.filter((el)=>el.done).length;
        const importantCount=todoData.filter((el)=>el.important&&!el.done).length;
        const todoCount=todoData.length-doneCount;
        return(<div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} important={importantCount}/>
        <div className="search-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>

          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>      
        <ToDoList todos={visibleItem} onDeleted={this.deleteItem} 
        onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}/>
        <ItemAddForm onAdd={this.addItem}></ItemAddForm>
    </div>);
    }
}