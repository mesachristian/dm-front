import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return(
        <Box 
        sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: 'calc(100vh - 80px)'
            }}>
                <CircularProgress />
        </Box>
    );
}

export default Loading;