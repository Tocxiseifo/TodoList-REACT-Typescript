import { InterfaceContext , Todo } from '../contexts/contexts';
import Tasks from './tasks';

// interface Todo {
//   id: string;
//   title: string;
//   isDone: boolean;
// }

export default function TodosLists() {
    const todos : Todo[] = [
        {
        id: '1',
        title:'first mission',
        isDone:false
        },
        {
        id: '2',
        title:'second mission',
        isDone:false
        },
        {
        id: '3',
        title:'third mission',
        isDone:false
        },

    ]
    // const todosList = todos.map((t)=>{
    //     return <TodosCards title={t.title} key={t.id} addClick={task} />
    // })
    return(
        <>
           
        </>
    )
}