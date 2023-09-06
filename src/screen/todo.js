import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../style/todo.css";
import { handleChange, addTodo, clearAll, deleteTodo, updateTodo } from '../store/slice';




const Todo = () => {

    const [indexNum, setIndexNum] = useState(0);
    const dispatch = useDispatch();
    const selectorData = useSelector((state) => state.todo.data)

    // on key down 
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (document.getElementById('inp').value.trim() != "") {
                let check = document.getElementById('addBtn').innerHTML;
                if (check == "Add") {
                    dispatch(addTodo());
                    document.getElementById('inp').value = "";
                }
                // update button
                else {
                    let updatedValue = document.getElementById('inp').value;
                    dispatch(updateTodo({ indexNumber: indexNum, updVal: updatedValue }));
                    document.getElementById('addBtn').innerHTML = "Add";
                    document.getElementById('inp').value = "";
                }
            }
            else {
                alert("Enter any text");
            }
        }
    }

    // add todo 
    let addItems = () => {
        if (document.getElementById('inp').value.trim() != "") {
            let check = document.getElementById('addBtn').innerHTML;
            if (check == "Add") {
                dispatch(addTodo());
                document.getElementById('inp').value = "";
            }
            // update button
            else {
                let updatedValue = document.getElementById('inp').value;
                dispatch(updateTodo({ indexNumber: indexNum, updVal: updatedValue }));
                document.getElementById('addBtn').innerHTML = "Add";
                document.getElementById('inp').value = "";
            }
        }
        else {
            alert("Enter any text");
        }
    }

    // edit Todo
    let editItem = (ind) => {
        document.getElementById('inp').value = selectorData[ind];
        document.getElementById('addBtn').innerHTML = "Update";
        setIndexNum(ind);
    }

    // delete todo
    let delItem = (ind) => {
        dispatch(deleteTodo(ind));
        document.getElementById('inp').value = "";
        document.getElementById('addBtn').innerHTML = "Add";
    }

    // stroke 
    let strokeLine = (ind) => {
        let check = document.getElementById(ind).style.textDecoration;
        if (check == "none") {
            document.getElementById(ind).style.textDecoration = "line-through";
        }
        else {
            document.getElementById(ind).style.textDecoration = "none";
        }
    }

    // Clear All 
    const clear = () => {
        document.getElementById('inp').value = "";
        document.getElementById('addBtn').innerHTML = "Add";
        dispatch(clearAll());
    }
    return (
        <>
            <div className='container'>
                <h1>Todo List</h1>
                <div className='center-div'>
                    <input type='text' onChange={(e) => dispatch(handleChange(e.target.value))} onKeyDown={handleKeyDown} id='inp' />
                    <button onClick={addItems} id='addBtn'>Add</button>
                    <button onClick={clear}>Clear</button>
                </div>
              
                    <ul>
                       
                        {
                            
                            selectorData.map((item, ind) => (
                                <div className='ul-div'>
                                

                                    <li className='li-item' onClick={() => strokeLine(ind)} id={ind}>{item}</li>
                                    <div>
                                    <span onClick={() => editItem(ind)}><i>i</i></span>
                                    <span onClick={() => delItem(ind)}>x</span>
                                    </div>
                                    

                                </div>
                            ))}
                           
                    </ul>
                
            </div>
        </>
    )
}
export default Todo;