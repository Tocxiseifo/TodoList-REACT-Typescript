//====================Material UI==================
import {
  Button,
  TextField,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect, useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Todo } from '../contexts/contexts';

export default function Inputs() {
  //==================HOOKS====================
  const [Task, setTask] = useState<Todo[]>([]);
  const [TaskTitle, setTaskTitle] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Edit Dialog States
  const [openEdit, setOpenEdit] = useState(false);
  const [editID, setEditID] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const completed = useMemo(() => Task.filter(t => t.isDone), [Task]);
  const nonCompleted = useMemo(() => Task.filter(t => !t.isDone), [Task]);

  const todosRender =
    filterType === 'Completed'? completed : filterType === 'NotCompleted' ? nonCompleted: Task;

  // ================== Handlers ==================

  function updateLocal(newTasks: Todo[]) {
    setTask(newTasks);
    localStorage.setItem('todos', JSON.stringify(newTasks));
  }

  function handleAddClick() {
    const newTasks = [
      ...Task,
      { id: uuid(), title: TaskTitle, isDone: false }
    ];
    updateLocal(newTasks);
    setTaskTitle('');
  }

  function handleDeleteClick(id: string) {
    const newTasks = Task.filter(t => t.id !== id);
    updateLocal(newTasks);
  }

  function handleCompleteClick(id: string) {
    const newTasks = Task.map(t =>
      t.id === id ? { ...t, isDone: !t.isDone } : t
    );
    updateLocal(newTasks);
  }

  function openEditDialog(id: string, title: string) {
    setEditID(id);
    setEditTitle(title);
    setOpenEdit(true);
  }

  function handleEditSubmit() {
    if (!editID) return;
    const newTasks = Task.map(t =>
      t.id === editID ? { ...t, title: editTitle } : t
    );
    updateLocal(newTasks);
    setOpenEdit(false);
  }

  // ================== Load Storage ==================
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('todos') || '[]');
    setTask(storage);
  }, []);

  // ================== JSX ==================
  return (
    <>
      <ToggleButtonGroup
        value={filterType}
        exclusive
        onChange={(e, val) => val && setFilterType(val)}
        style={{ marginBottom: '50px' }}
      >
        <ToggleButton value="Completed">Completed</ToggleButton>
        <ToggleButton value="NotCompleted">Not Completed</ToggleButton>
        <ToggleButton value="all">All</ToggleButton>
      </ToggleButtonGroup>

      <div style={{ overflowY: 'scroll', marginBottom: '100px' }}>
        {todosRender.map(t => (
          <div
            key={t.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '25px',
              background: 'skyBlue',
              color: 'white',
              margin: '15px 0',
              width: '550px',
              borderRadius: '8px',
              fontSize: '25px',
              textDecoration: t.isDone ? 'line-through' : ''
            }}
          >
            {t.title}

            <div style={{ display: 'flex', gap: '15px' }}>

              <IconButton
                style={{
                  color: t.isDone ? 'white' : '#8bc34a',
                  background: t.isDone ? '#8bc34a' : 'white',
                  border: '3px solid #8bc34a'
                }}
                onClick={() => handleCompleteClick(t.id)}
              >
                <DoneIcon />
              </IconButton>

              <IconButton
                style={{
                  color: '#1769aa',
                  background: 'white',
                  border: '3px solid #1769aa'
                }}
                onClick={() => openEditDialog(t.id, t.title)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                style={{
                  color: 'red',
                  background: 'white',
                  border: '3px solid red'
                }}
                onClick={() => handleDeleteClick(t.id)}
              >
                <DeleteIcon />
              </IconButton>

            </div>
          </div>
        ))}
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your task here:</DialogContentText>
          <TextField
            autoFocus
            fullWidth
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            label="Task name"
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditSubmit} disabled={!editTitle.trim()}>
            Save
          </Button>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* ADD TASK */}
      <div
        style={{
          position: 'fixed',
          top: '740px',
          display: 'flex',
          gap: '10px'
        }}
      >
        <Button
          variant="contained"
          disabled={!TaskTitle}
          onClick={handleAddClick}
        >
          Add Task
        </Button>

        <TextField
          label="New Task"
          variant="outlined"
          value={TaskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          style={{ width: '490px' }}
        />
      </div>
    </>
  );
}
