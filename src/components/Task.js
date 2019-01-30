import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            innerRef={provided.innerRef}
          >
            {this.props.task.content}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;
