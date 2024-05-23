import { Button, TextField, styled } from "@mui/material";

export const StandardTextInput = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
});

export const StandardButton = styled(Button)({
    backgroundColor: 'rgb(33, 43, 54)',
    textTransform: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    minWidth: '100%',
    marginTop: '3rem',
    '&:hover': {
        backgroundColor: 'rgb(69, 79, 91)',
    },
});