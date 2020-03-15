import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

import { blue } from '@material-ui/core/colors';
import axios from 'axios';
import SnackbarUtils from '../utils/SnackbarUtils'

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
    React.useEffect(() => {
        loadUsers();
    }, []);
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const [openAddUser, setOpenAddUser] = React.useState<boolean>(false);
    const [saving, setSaving] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [name, setName] = React.useState<string>('');
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: IUser) => {
        onClose(value);
    };

    const loadUsers = async () => {

        try {
            const { data } = await axios.get('api/users');
            setUsers(data);

        } catch (ex) {
            console.error(ex);
        }
    }

    const addUser = async () => {
        if (!name) {
            return;
        }
        setSaving(true);
        try {
            const { data } = await axios.post('api/users', { name });
            console.log({ data });
        } catch (error) {
            console.log({ error });
            SnackbarUtils.error(error.message);
        }
        setSaving(false);
        setOpenAddUser(false); 
        loadUsers();
    }

    return (
        <>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Definir funcionario</DialogTitle>
                <List>
                    {users.map((user: IUser, idx) => (
                        <ListItem button onClick={() => handleListItemClick(user)} key={idx}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    ))}
                    <ListItem autoFocus button onClick={() => { setOpenAddUser(true); setName(''); }}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Adicionar funcionario" />
                    </ListItem>
                </List>
            </Dialog>
            <Dialog onClose={() => { }} aria-labelledby="simple-dialog-title" open={openAddUser}>
                <DialogContent>
                    <TextField
                        defaultValue={name}
                        onChange={handleChangeName}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddUser(false)} disabled={saving} color="secondary">Cancelar</Button>
                    <Button onClick={() => {addUser()}} disabled={saving} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default SelectUser;