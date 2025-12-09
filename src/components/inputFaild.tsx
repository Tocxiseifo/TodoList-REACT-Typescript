//------------Material UI--------------
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useContext, useEffect, useState , useMemo } from 'react';
import {v4 as uuid} from 'uuid'
import { Todo } from '../contexts/contexts';
import Tasks from './tasks';

export default function Inputs() {
    // const contexts = useContext(InterfaceContext)
    //================Hooks===================
    const [Task,setTask] = useState<Todo[]>([])
    const [TaskTitle , setTaskTitle] = useState<string>('')
    const [filterType , setFilterType] = useState<string>('all')


    let completed = useMemo(()=> Task.filter((t)=> t.isDone) ,[Task]) // to save the value in memory
    let NonCompleted = useMemo(()=> Task.filter((t)=> !t.isDone) ,[Task])

    let todosRender =  filterType === 'Completed' ? completed : filterType === 'Not-Complete' ? NonCompleted : Task 


    //===============Event Handler==============
    function handleAddClick() {
        const upDateState = [...Task,{
            id:uuid(),
            title:TaskTitle,
            isDone:false
        }]
        setTask(upDateState)
        localStorage.setItem('todos',JSON.stringify(upDateState))
        setTaskTitle('')
    }
    
    function handleDeleteClick(Id:string) {
        const deletes = Task.filter((t)=> t.id !== Id)
        localStorage.setItem('todos' , JSON.stringify(deletes))
        return setTask(deletes)
    } 

    function handleCompleteClick(Id:string) {
        const upDateCompleted = Task.map((t)=>{
            if (t.id === Id) {
                return {...t , isDone:!t.isDone}
            }else{
                return t 
            }
        })
        localStorage.setItem('todos' , JSON.stringify(upDateCompleted))
        setTask(upDateCompleted)
    }

    useEffect(()=>{
        const storageUpdate = JSON.parse(localStorage.getItem('todos') || '[]')        
        setTask(storageUpdate)
    },[])
    return(
        <>
            <ToggleButtonGroup
            value={filterType}
            exclusive
            onChange={(event ,filter:string)=>{ //make two params to solve the error of target.value
                setFilterType(filter)
            }}
            aria-label="text alignment"
            style={{
                marginBottom:'50px'
            }}
            >
            <ToggleButton value="Completed" aria-label="left aligned" >
                Completed
            </ToggleButton>
            <ToggleButton value="Not-Complete" aria-label="centered">
                Not-Complete
            </ToggleButton>
            <ToggleButton value="all" aria-label="right aligned">
                All
            </ToggleButton>
            </ToggleButtonGroup>
        <div style={{
            overflowY:'scroll',
            marginBottom:'100px'

        }}> 
         {  
            <div style={{
                marginBottom:'10px' 
             }}>
                {todosRender.map((t) =>(  
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        gap:'25px',
                        padding:'25px',
                        background:'skyBlue',
                        color:'white',
                        marginTop:'15px',
                        width:'550px',
                        borderRadius:'8px',
                        cursor:'pointer',
                        marginBottom:'15px',
                        fontSize:'25px',
                        textDecoration:t.isDone?'line-through':''
                    }}
                    key={t.id}>
                        {t.title}
                        <div style={{display: 'flex' , gap:'15px'}}>
                            <IconButton  style={{color:t.isDone ? 'white': '#8bc34a', background:t.isDone ? '#8bc34a': 'white',border: 'solid #8bc34a 3px'}} onClick={()=> handleCompleteClick(t.id)}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton onClick={()=> handleDeleteClick(t.id)} style={{color:'red',background:'white' , border:'solid  red 3px'}}  >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
        }
        </div>
            <div style={{
                marginTop:'75px',
                display:'flex',
                justifyContent:'flex-start',
                alignItems:'flex-start',
                flexDirection:'row',
                gap:'10px',
                marginBottom:'20px',
                position:'fixed',
                top:'660px',
                zIndex:'16'
            }}>
                <Button variant="contained" style={{height:'57px'}} disabled={TaskTitle === '' ? true : false} onClick={handleAddClick}>Add Task</Button>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width:'490px'}} value={TaskTitle} onChange={(e)=> setTaskTitle(e.target.value)}  />
            </div>        
        </>
    )
}