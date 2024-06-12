import { Box, styled } from "@mui/material";

export const CoverContainer = styled(Box)({
    border: '1px solid black', 
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    minHeight: '260px', 
    marginBottom: '-1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
});