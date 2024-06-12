import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface ConfirmationDialogProps {
    id: string;
    keepMounted: boolean;
    open: boolean;
    content: string;
    onClose: (value?: boolean) => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {

    const { t } = useTranslation();

    const { onClose, content, open, ...other } = props;

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogContent dividers>
                <Typography>
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    {t("global.cancel")}
                </Button>
                <Button onClick={handleOk}>{t("global.confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;