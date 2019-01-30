import React, { Component } from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

class Column extends Component {
  render() {
    return (
      <div >
        <h3>{this.props.column.title}</h3>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              className="taskList"
              style={{minHeight: '100px', border: '1px dashed'}}
              ref={provided.innerRef}
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default Column;
