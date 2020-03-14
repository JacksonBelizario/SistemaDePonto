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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TodayIcon from '@material-ui/icons/Today';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import CallMadeIcon from '@material-ui/icons/CallMade';

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

declare type pontoType = {
    id: number,
    dia: Date | MaterialUiPickersDate,
    entrada: Date | MaterialUiPickersDate | null,
    saidaAlmoco: Date | MaterialUiPickersDate | null,
    entradaAlmoco: Date | MaterialUiPickersDate | null,
    saida: Date | MaterialUiPickersDate | null,
}

const Home = () => {
    React.useEffect(() => {
        loadData();
    }, []);

    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const [edit, setEdit] = React.useState<number>(-1);
    const [dia, setDia] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [entrada, setEntrada] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [saidaAlmoco, setSaidaAlmoco] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [entradaAlmoco, setEntradaAlmoco] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [saida, setSaida] = React.useState<Date | MaterialUiPickersDate | null>(null);
    const [pontos, setPontos] = React.useState<pontoType[]>([]);

    const loadData = async () => {
        const { data } = await axios.get('/api/ponto');

        setPontos(data.map((o: pontoType) => ({
            dia: o.dia ? moment(o.dia) : null,
            entrada: o.entrada ? moment(o.entrada) : null,
            saidaAlmoco: o.saidaAlmoco ? moment(o.saidaAlmoco) : null,
            entradaAlmoco: o.entradaAlmoco ? moment(o.entradaAlmoco) : null,
            saida: o.saida ? moment(o.saida) : null,
        })));
    } 

    const handleClickOpen = () => {
        setOpen(true);
        setEdit(-1);
    };

    const handleDia = (date: MaterialUiPickersDate | null) => {
        if (!date) {
            setDia(null);
            return;
        }
        setDia(moment(date).startOf('day'));
    }

    const parseTime = (hora: MaterialUiPickersDate) => {
        // @ts-ignore
        let time = moment(hora).format("HH:mm:ss");
        // @ts-ignore
        let date = moment(dia).format("YYYY-MM-DD"); 
        return moment(`${date}T${time}`);
    }

    const handleEntrada = (hora: MaterialUiPickersDate | null) => {
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

    const handleSaidaAlmoco = (hora: MaterialUiPickersDate | null) => {
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

    const handleEntradaAlmoco = (hora: MaterialUiPickersDate | null) => {
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

    const handleSaida = (hora: MaterialUiPickersDate | null) => {
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
        if (edit === -1) {
            setPontos([
                ...pontos,
                {
                    id: -1,
                    dia,
                    entrada,
                    saidaAlmoco,
                    entradaAlmoco,
                    saida,
                }
            ]);
            const { data } = await axios.post('/api/ponto', {
                userId: 1,
                dia,
                entrada,
                saidaAlmoco,
                entradaAlmoco,
                saida,
            });

            console.log({ data });
        } else {
            const pontosCpy = [...pontos];
            pontosCpy[edit] = {
                id: pontosCpy[edit].id,
                dia,
                entrada,
                saidaAlmoco,
                entradaAlmoco,
                saida,
            };
            setPontos(pontosCpy);
        }
        handleClose();
    }

    const removerPonto = (idx: number) => {
        const pontosCpy = [...pontos];
        pontosCpy.splice(idx, 1)
        setPontos(pontosCpy);
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    return (
        <div className={classes.root}>
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
                            {pontos.map((ponto : pontoType, idx) => (
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


export default connect()(Home);