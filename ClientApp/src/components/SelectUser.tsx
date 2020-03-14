import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

const emails = [
    {
        id: 1,
        name: 'Jackson'
    },
    {
        id: 2,
        name: 'Igor'
    },
];

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export interface IUser {
    id: number,
    name: string
}

export interface SelectUserProps {
    open: boolean;
    selectedValue: IUser;
    onClose: (value: IUser) => void;
}

const SelectUser = (props: SelectUserProps) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: IUser) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Definir funcionario</DialogTitle>
            <List>
                {emails.map((email: IUser, idx) => (
                    <ListItem button onClick={() => handleListItemClick(email)} key={idx}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email.name} />
                    </ListItem>
                ))}
                <ListItem autoFocus button onClick={() => { }}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Adicionar funcionario" />
                </ListItem>
            </List>
        </Dialog>
    );
}
export default SelectUser;