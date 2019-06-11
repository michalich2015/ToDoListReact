import React,{Component} from 'react'
import './item-add-form.css'

export default class Itemaddform extends Component{
    state={
        label:''
    }
    onLabelChange=(e)=>
    {
        this.setState({label:e.target.value})
    }
    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.label.length>0)
        {
        this.props.onAdd(this.state.label);
        this.setState({
            label:''
        })
        }
    }
    render(){
        return(
            <form className="item-add-form flex"
            onSubmit={this.onSubmit}>
                <input type="text" className="form-control"
                 onChange={this.onLabelChange}
                placeholder="What`s need to be done?"
                value={this.state.label}>
                </input>
                <button className="btn btn-outline-secondary float-right">
                    Add Item
                    </button>
            </form>
        )
    }
}