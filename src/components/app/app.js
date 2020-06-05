import React, { Component } from 'react';
import AppHeader from '../app-header/'
import ToDoList from '../todo-list/'
import SearchPanel from '../search-panel/'
import ItemStatusFilter from '../item-status-filter/'
import AddComponent from '../add-component'
import './app.css';
export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.createTododItem('Grocery!'),
            this.createTododItem('Visit grandma!!!'),
            this.createTododItem('Make a laundry!')
        ],
        term: "",
        filter: ''// active, all, done
    };
    createTododItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArray
            }
        });
    }
    //ajax/fetch
    onItemAdded = (text) => {
        const newItem = this.createTododItem(text);
        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ]
            return {
                todoData: newArr
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        //1) updating an object
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        //2) creating new object
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }

        })
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };
    onSearchChange = (term) => {
        this.setState({ term })
    }

    onFilterChange = (filter) => {
        this.setState({ filter })
    }

    /////mistake below
    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }
    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }


    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (<div className='todo-app' >

            <AppHeader todo={todoCount} done={doneCount} />
            <div className='top-panel d-flex'>
                <SearchPanel
                    onSearchChange={this.onSearchChange} />
                <ItemStatusFilter
                    filter={filter}
                    onFilterChange={this.onFilterChange} />
            </div>
            <ToDoList
                todos={visibleItems}
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone} />
            <AddComponent onItemAdded={this.onItemAdded} />

        </div>)// сдесь мы указываем источник для свойства todos
    };
}
