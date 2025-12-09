import Container from '@mui/material/Container';
import Tasks from "./tasks";
import ProviderInterFace from "../contexts/contexts";



export default function Todo(){    
    return(
        <>
            <Container maxWidth="md" style={{
               display:'flex',
               flexDirection:'column',
            //    gap:'25px',
               justifyContent:'center',
               alignItems:'center'
            }}>
                <ProviderInterFace >
                    <Tasks/>                
                </ProviderInterFace>
            </Container>
        </>
    )
}