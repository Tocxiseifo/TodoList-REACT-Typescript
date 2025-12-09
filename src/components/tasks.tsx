import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import ToggleButtons from "./toggleButtons"
import TodosLists from './todosList';
import Inputs from './inputFaild';

                

export default function Tasks() {
    return(
        <>
            <Card style={{
                height:'670px',
                width:'650px',
                display:'flex',
                alignItems:'center',
                flexDirection:'column'
            }} >
                <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 40 }}>
                    Todos-List
                    <hr style={{width: '620px'}}/>
                </Typography>
                </CardContent>
                {/* <ToggleButtons /> */}
                <TodosLists/>
                <Inputs  />
            </Card>
        </>
    )
}