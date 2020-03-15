import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SnackbarUtils from '../utils/SnackbarUtils'

import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import TodayIcon from '@material-ui/icons/Today';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CachedIcon from '@material-ui/icons/Cached';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import CallMadeIcon from '@material-ui/icons/CallMade';

import SelectUser, { IUser } from '../components/SelectUser';

import {
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from "moment";

import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
            position: 'relative',
            marginTop: 20
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

declare type IDate = Date | MaterialUiPickersDate;

declare type IPonto = {
    id: number,
    userId: number,
    dia: IDate,
    entrada: IDate,
    saidaAlmoco: IDate,
    entradaAlmoco: IDate,
    saida: IDate,
}

const Home = () => {

    const classes = useStyles();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [saving, setSaving] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [edit, setEdit] = React.useState<number>(-1);
    const [dia, setDia] = React.useState<IDate>(null);
    const [entrada, setEntrada] = React.useState<IDate>(null);
    const [saidaAlmoco, setSaidaAlmoco] = React.useState<IDate>(null);
    const [entradaAlmoco, setEntradaAlmoco] = React.useState<IDate>(null);
    const [saida, setSaida] = React.useState<IDate>(null);
    const [pontos, setPontos] = React.useState<IPonto[]>([]);


    const [openDialogUser, setOpenDialogUser] = React.useState(false);
    const [user, setUser] = React.useState<IUser>({ id: -1, name: 'Alterar Funcionario' });


    const handleCloseDialogUser = (value: IUser) => {
        setOpenDialogUser(false);
        setUser(value);
        loadData(value);
    };
    const loadData = async (value: IUser) => {
        const { id } = value;
        if (!id || id === -1) {
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/ponto/user/${id}`);

            setPontos(data.map((o: IPonto) => ({
                id: o.id,
                userId: o.userId,
                dia: o.dia ? moment(o.dia) : null,
                entrada: o.entrada ? moment(o.entrada) : null,
                saidaAlmoco: o.saidaAlmoco ? moment(o.saidaAlmoco) : null,
                entradaAlmoco: o.entradaAlmoco ? moment(o.entradaAlmoco) : null,
                saida: o.saida ? moment(o.saida) : null,
            })));
        } catch (error) {
            console.log({ error });
            SnackbarUtils.error(error.message);
        }
        setLoading(false);
    } 

    const handleClickOpen = () => {
        setOpen(true);
        setEdit(-1);
    };

    const handleDia = (date: IDate) => {
        if (!date) {
            setDia(null);
            return;
        }
        setDia(moment(date).startOf('day'));
    }

    const parseTime = (hora: IDate) => {
        // @ts-ignore
        let time = moment(hora).format("HH:mm:ss");
        // @ts-ignore
        let date = moment(dia).format("YYYY-MM-DD"); 
        return moment(`${date}T${time}`);
    }

    const handleEntrada = (hora: IDate) => {
        if (!hora || !dia) {
            setEntrada(null);
            return;
        }
        hora = parseTime(hora);

        if (!!saidaAlmoco && moment(hora).isAfter(saidaAlmoco)) {
            setEntrada(null);
            return;
        }
        if (!!entradaAlmoco && moment(hora).isAfter(entradaAlmoco)) {
            setEntrada(null);
            return;
        }
        if (!!saida && moment(hora).isAfter(saida)) {
            setEntrada(null);
            return;
        }

        setEntrada(hora);
    }

    const handleSaidaAlmoco = (hora: IDate) => {
        if (!hora || !dia) {
            setSaidaAlmoco(null);
            return;
        }
        hora = parseTime(hora);

        if (!!entrada && moment(hora).isBefore(entrada)) {
            setSaidaAlmoco(null);
            return;
        }
        if (!!entradaAlmoco && moment(hora).isAfter(entradaAlmoco)) {
            setSaidaAlmoco(null);
            return;
        }
        if (!!saida && moment(hora).isAfter(saida)) {
            setSaidaAlmoco(null);
            return;
        }

        setSaidaAlmoco(hora);
    }

    const handleEntradaAlmoco = (hora: IDate) => {
        if (!hora || !dia) {
            setEntradaAlmoco(null);
            return;
        }
        hora = parseTime(hora);

        if (!!entrada && moment(hora).isBefore(entrada)) {
            setEntradaAlmoco(null);
            return;
        }
        if (!!saidaAlmoco && moment(hora).isBefore(saidaAlmoco)) {
            setEntradaAlmoco(null);
            return;
        }
        if (!!saida && moment(hora).isAfter(saida)) {
            setEntradaAlmoco(null);
            return;
        }

        setEntradaAlmoco(hora);
    }

    const handleSaida = (hora: IDate) => {
        if (!hora || !dia) {
            setSaida(null);
            return;
        }
        hora = parseTime(hora);

        if (!!entrada && moment(hora).isBefore(entrada)) {
            setSaida(null);
            return;
        }
        if (!!saidaAlmoco && moment(hora).isBefore(saidaAlmoco)) {
            setSaida(null);
            return;
        }
        if (!!entradaAlmoco && moment(hora).isBefore(entradaAlmoco)) {
            setSaida(null);
            return;
        }

        setSaida(hora);
    }

    const handleClose = () => {
        setOpen(false);
        setEntrada(null);
        setSaidaAlmoco(null);
        setEntradaAlmoco(null);
        setSaida(null);
        setEdit(-1);
    };

    const handleSave = async () => {
        if(!dia) {
            return;
        }
        setSaving(true);
        try {
            if (edit === -1) {
                const { data } = await axios.post('/api/ponto', {
                    userId: user.id,
                    dia: dia ? moment(dia).format() : null,
                    entrada: entrada ? moment(entrada).format() : null,
                    saidaAlmoco: saidaAlmoco ? moment(saidaAlmoco).format() : null,
                    entradaAlmoco: entradaAlmoco ? moment(entradaAlmoco).format() : null,
                    saida: saida ? moment(saida).format() : null,
                });

                console.log({ data });
                const { id } = data;
                setPontos([
                    ...pontos,
                    {
                        id,
                        userId: user.id,
                        dia,
                        entrada,
                        saidaAlmoco,
                        entradaAlmoco,
                        saida,
                    }
                ]);
                SnackbarUtils.success('Ponto inserido');
            } else {
                const pontosCpy = [...pontos];
                const { id, userId } = pontosCpy[edit];

                const { data } = await axios.put(`/api/ponto/${id}`, {
                    dia: dia ? moment(dia).format() : null,
                    entrada: entrada ? moment(entrada).format() : null,
                    saidaAlmoco: saidaAlmoco ? moment(saidaAlmoco).format() : null,
                    entradaAlmoco: entradaAlmoco ? moment(entradaAlmoco).format() : null,
                    saida: saida ? moment(saida).format() : null,
                });

                console.log({ data });

                pontosCpy[edit] = {
                    id,
                    userId,
                    dia,
                    entrada,
                    saidaAlmoco,
                    entradaAlmoco,
                    saida,
                };
                setPontos(pontosCpy);
                SnackbarUtils.success('Ponto atualizado');
            }
            handleClose();
        } catch (error) {
            console.log({ error });
            SnackbarUtils.error(error.message);
        }
        setSaving(false);
    }

    const removerPonto = async (idx: number) => {
        try {
            const pontosCpy = [...pontos];
            const { id } = pontosCpy[idx];

            const { data } = await axios.delete(`/api/ponto/${id}`);
            console.log({ data });

            pontosCpy.splice(idx, 1)
            setPontos(pontosCpy);
            SnackbarUtils.info('Ponto removido');
        } catch (error) {
            console.log({ error });
            SnackbarUtils.error(error.message);
        }
    }

    const editarPonto = (idx: number) => {
        const ponto = pontos[idx];
        setEdit(idx);
        setDia(ponto.dia);
        setEntrada(ponto.entrada);
        setSaidaAlmoco(ponto.saidaAlmoco);
        setEntradaAlmoco(ponto.entradaAlmoco);
        setSaida(ponto.saida);
        setOpen(true);
    }

    const renderDialog = () => (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Bater ponto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Informe a data e os horarios de seu ponto
                    </DialogContentText>
                    <Grid container justify="space-between" spacing={2}>
                         <Grid item xs={12}>
                            <KeyboardDatePicker
                                disableToolbar
                                disabled={!(edit === -1)}
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="date-picker-inline"
                                label="Data"
                                value={dia}
                                onChange={handleDia}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                autoOk
                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                disabled={!dia}
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Entrada"
                                ampm={false}
                                value={entrada}
                                onChange={handleEntrada}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                autoOk
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                disabled={!dia}
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Saida almoco"
                                ampm={false}
                                value={saidaAlmoco}
                                onChange={handleSaidaAlmoco}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                autoOk
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                disabled={!dia}
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Entrada almoco"
                                ampm={false}
                                value={entradaAlmoco}
                                onChange={handleEntradaAlmoco}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                autoOk
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KeyboardTimePicker
                                disableToolbar
                                disabled={!dia}
                                variant="inline"
                                margin="normal"
                                id="time-picker"
                                label="Saida"
                                ampm={false}
                                value={saida}
                                onChange={handleSaida}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                autoOk
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <div className={classes.wrapper}>
                        <Button variant="contained" onClick={handleClose} color="secondary" disabled={saving}>Cancelar</Button>
                        {saving && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <div className={classes.wrapper}>
                        <Button variant="contained" onClick={handleSave} color="primary" disabled={saving}>Salvar</Button>
                        {saving && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );

    if (loading) {
        return <div className={classes.root} style={{ justifyContent: 'center', marginTop: 50 }}> <CircularProgress /></div>
    }

    return (
        <div className={classes.root}>
            <SelectUser selectedValue={user} open={openDialogUser} onClose={handleCloseDialogUser} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid item xs={12} style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton edge="end" color="primary" onClick={() => setOpenDialogUser(true)}>
                            <CachedIcon />
                        </IconButton>
                        <Typography variant="subtitle1" style={{flex: 1, marginLeft: 20}}>{user.name}</Typography>
                        { (user.id && user.id !== -1) &&
                            <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
                                <AddIcon />
                            </Fab>
                        }
                    </Grid>
                    <div className={classes.demo}>
                        <List>
                            {pontos.map((ponto : IPonto, idx) => (
                                <ListItem key={idx}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <TodayIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={ponto.dia && moment(ponto.dia).format("DD/MM/YYYY")}
                                        secondary={
                                            <Grid container spacing={1}>
                                                {ponto.entrada && <span><CallReceivedIcon fontSize="small" color="primary" /> {moment(ponto.entrada).format("HH:mm")}</span>}
                                                {ponto.saidaAlmoco && <span><CallMadeIcon fontSize="small" color="error" /> {moment(ponto.saidaAlmoco).format("HH:mm")}</span>}
                                                {ponto.entradaAlmoco && <span><CallReceivedIcon fontSize="small" color="primary" /> {moment(ponto.entradaAlmoco).format("HH:mm")}</span>}
                                                {ponto.saida && <span><CallMadeIcon fontSize="small" color="error" /> {moment(ponto.saida).format("HH:mm")}</span>}
                                            </Grid>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => editarPonto(idx)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => removerPonto(idx)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>)
                            )}
                        </List>
                    </div>
                </Grid>
            </Grid>
            {renderDialog()}
        </div>
    );
}


export default Home;