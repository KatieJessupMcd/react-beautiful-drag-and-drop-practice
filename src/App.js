import React, { Component } from 'react';
import './App.css';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {
        'task-1': { id: 'task-1', content: 'take out the garbage' },
        'task-2': { id: 'task-2', content: 'clean the kitchen' },
        'task-3': { id: 'task-3', content: 'go to the dmv' },
        'task-4': { id: 'task-4', content: 'book plane tickets' }
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To do',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
          id: 'column-2',
          title: 'In Progress',
          taskIds: []
        },
        'column-3': {
          id: 'column-3',
          title: 'Done',
          taskIds: []
        }
      },
      columnOrder: ['column-1', 'column-2', 'column-3']
    };
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds, 
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.setState(newState);
    return;
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;
