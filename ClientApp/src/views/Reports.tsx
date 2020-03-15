import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CustomTable from '../components/CustomTable';

import axios from 'axios';
import moment from "moment";
import "moment-duration-format";

interface IColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: IColumn[] = [
    { id: 'user', label: 'Nome', minWidth: 170 },
    {
        id: 'dia',
        label: 'Dia',
        minWidth: 170,
        align: 'right',
        format: (value: number) => moment(value).format("DD/MM/YYYY"),
    },
    {
        id: 'entrada',
        label: 'Entrada',
        minWidth: 170,
        align: 'right',
        format: (value: number) => moment(value).format("HH:mm"),
    },
    {
        id: 'saidaAlmoco',
        label: 'Saida Almoco',
        minWidth: 170,
        align: 'right',
        format: (value: number) => moment(value).format("HH:mm"),
    },
    {
        id: 'entradaAlmoco',
        label: 'Entrada Almoco',
        minWidth: 170,
        align: 'right',
        format: (value: number) => moment(value).format("HH:mm"),
    },
    {
        id: 'saida',
        label: 'Saida',
        minWidth: 170,
        align: 'right',
        format: (value: number) => moment(value).format("HH:mm"),
    },
    {
        id: 'seconds',
        label: 'Horas trabalhadas',
        minWidth: 170,
        align: 'right',
        format: (value: number) => moment.duration(value, "seconds").format("HH:mm"),
    },
];

const columnsMonth: IColumn[] = [
    { id: 'user', label: 'Nome', minWidth: 170 },
    {
        id: 'month',
        label: 'Mês',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'seconds',
        label: 'Horas trabalhadas',
        minWidth: 170,
        align: 'right',
        format: (value: number) => moment.duration(value, "seconds").format("HH:mm"),
    },
];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const Reports = () => {
    React.useEffect(() => {
        loadUsers();
    }, []);
    const classes = useStyles();
    const [rows, setRows] = React.useState<any[]>([]);
    const [rowsMonth, setRowsMonth] = React.useState<any[]>([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const loadUsers = async () => {
        let { data } = await axios.get('api/users');

        let users = data.reduce((obj: any, item: any) => {
            obj[item.id] = item.name;
            return obj
        }, {});

        const { data: pontos } = await axios.get('api/ponto');

        parseData(users, pontos);
    }


    const parseData = (users: any, pontos: any[]) => {

        console.log({ users });
        const rowsByDay = pontos.map(o => {
            let manha = 0, tarde = 0, dia = 0;
            if (o.entrada && o.saidaAlmoco) {
                manha = moment(o.saidaAlmoco).diff(o.entrada, 'seconds');
            }
            if (o.entradaAlmoco && o.saida) {
                tarde = moment(o.saida).diff(o.entradaAlmoco, 'seconds');
            }
            // Não houve intervalo para o almoço
            if (manha === 0 && tarde === 0 && o.entrada && o.saida) {
                dia = moment(o.saida).diff(o.entrada, 'seconds');
            }
            return {
                ...o,
                user: users[o.userId],
                seconds: manha + tarde + dia
            }
        });

        setRows(rowsByDay);

        let rowsByMonth = rowsByDay.reduce((obj: any, item: any) => {
            const month = moment(item.dia).format('YYYY-MM');
            const key = `${item.userId}_${month}`;

            if (!obj.hasOwnProperty(key)) {
                obj[key] = {
                    userId: item.userId,
                    user: item.user,
                    month: moment(item.dia).format('MM/YYYY'),
                    seconds: item.seconds,
                }
            } else {
                obj[key]['seconds'] += item.seconds;
            }
            return obj
        }, {});

        rowsByMonth = Object.values(rowsByMonth);

        setRowsMonth(rowsByMonth);
    }

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Por dia" />
                <Tab label="Por mês" />
            </Tabs>
            {value === 0 && <CustomTable columns={columns} rows={rows} />}
            {value === 1 && <CustomTable columns={columnsMonth} rows={rowsMonth} />}
        </Paper>
    );

}
export default Reports;