import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import { Modal as MaterialModal, Backdrop, Fade } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

interface Props {
    label: string,
    description: string,
    isOpen: boolean,
    close: Function,
    children: React.ReactElement<any, any>
}

const Modal = ({
    label,
    description,
    isOpen,
    close,
    children
}: Props) => {
    const classes = useStyles();

    const handleClose = (): void => {
        close();
    };

    return (
        <MaterialModal
            aria-labelledby={label}
            aria-describedby={description}
            open={isOpen}
            onClose={handleClose}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={classes.paper}>
                    {children}
                </div>
            </Fade>
        </MaterialModal>
    );
};

export default Modal;
