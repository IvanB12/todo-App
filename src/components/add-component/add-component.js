import React, { Component } from 'react';
import './add-component.css'
//
export default class AddComponent extends Component {
    state = {
        label: ""
    };
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value //here I can add build function to change input 
        })
    }
    onSubmit = (e) => {
        e.preventDefault();// this line to avoid refresh page
        this.props.onItemAdded(this.state.label)
        this.setState({
            label:''
        })
    }
    render(item) {
        return (
            <form className='add-element-form d-flex'
                onSubmit={this.onSubmit}>
                <input type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done?"
                    value={this.state.label}/>
                <button
                    className=' btn btn-primary btn-m float-center'>
                    <i className='fa fa-plus' />
                </button>


            </form>
        )
    }
}
