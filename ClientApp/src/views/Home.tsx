import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import {
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

function generate(element: React.ReactElement) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Home = () => {
    const classes = useStyles();
    const [secondary, setSecondary] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [entrada, setEntrada] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [saidaAlmoco, setSaidaAlmoco] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [entradaAlmoco, setEntradaAlmoco] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [saida, setSaida] = React.useState<Date | MaterialUiPickersDate | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderDialog = () => (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Bater ponto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Informe os horarios de seu ponto
                    </DialogContentText>
                    <Grid container justify="space-between" spacing={2}>
                         <Grid item xs={12}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="date-picker-inline"
                                label="Data"
                                value={selectedDate}
                                onChange={setSelectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Entrada"
                                ampm={false}
                                value={entrada}
                                onChange={setEntrada}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Saida almoco"
                                ampm={false}
                                value={saidaAlmoco}
                                onChange={setSaidaAlmoco}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Entrada almoco"
                                ampm={false}
                                value={entradaAlmoco}
                                onChange={setEntradaAlmoco}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Saida"
                                ampm={false}
                                value={saida}
                                onChange={setSaida}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    return (
        <div className={classes.root}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={event => setSecondary(event.target.checked)}
                            value="secondary"
                        />
                    }
                    label="Enable secondary text"
                />
            </FormGroup>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        Nome do funcionario
                        <IconButton edge="end" color="primary" onClick={handleClickOpen}>
                            <AddCircleOutlineRoundedIcon fontSize="large" />
                        </IconButton>
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            {generate(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </Grid>
            </Grid>
            {renderDialog()}
        </div>
    );
}


export default connect()(Home);