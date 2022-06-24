import React from 'react'
import PropType from 'prop-types'

import Todo from './Todo'

import SchedulerForm from './SchedulerForm'
import logSchema from '../Schema/logSchema'
import todoSchema from '../Schema/todoSchema'

function Scheduler({ logs, todos, setTodos }) {
    function handleDelete(id) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    const todoElements = todos.map((todo) => (
        <Todo key={todo.id} todo={todo} deleteTodo={() => handleDelete(todo.id)} />
    ))

    return (
        <div className="scheduler main">
            <h1 className="center-vertically heading-1">Categorize Today's Tasks</h1>
            <div className="scheduler-content">
                <div className="scheduler-heading">
                    <p>Type of Task</p>
                    <p>Target Time in Minutes</p>
                    <p>Percentage of Target Achieved</p>
                    <p>Add/Delete Tasks</p>
                </div>
                <div className="scheduler-list">{todoElements}</div>
                <SchedulerForm logs={logs} setTodos={setTodos} />
            </div>
        </div>
    )
}

Scheduler.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    todos: PropType.arrayOf(todoSchema).isRequired,
    setTodos: PropType.func.isRequired,
}

export default Scheduler
