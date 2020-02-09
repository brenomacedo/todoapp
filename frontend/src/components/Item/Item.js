import React from 'react'
import { MdBook, MdDelete, MdEdit, MdCancel } from 'react-icons/md'
import './Item.css'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map((row, index) => {
            if(row._id !== props.editing){
                return (
                    <div key={index} className="item">
                        <header><MdBook /> {row.description}</header>
                        <button onClick={() => props.handleDelete(row._id)} className="delete"><MdDelete /></button>
                        <button onClick={() => props.handleEdit(row._id, row.description)} className="edit"><MdEdit /></button>
                    </div>
                )
            }else{
                return (
                    <div key={index} className="item">
                        <header><MdBook /> <input className="edit" onChange={props.handleChangeEdit} type="text" value={props.editingValue}/></header>
                        <button onClick={() => props.handlePut(row._id)} className="edit"><MdEdit /></button>
                        <button onClick={props.handleCancel} className="delete"><MdCancel /></button>
                    </div>
                )
            }
        })
    }

    return (
    <div>
        {renderRows()}
    </div>
    )
}

