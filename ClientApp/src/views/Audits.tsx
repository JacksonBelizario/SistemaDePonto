import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import CustomTable from '../components/CustomTable';

import axios from 'axios';
import moment from "moment";

interface IColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: IColumn[] = [
    {
        id: 'id',
        label: 'ID',
        minWidth: 170,
        format: (value: number) => value.toString(),
    },
    {
        id: 'tableName',
        label: 'Tabela',
        minWidth: 170,
    },
    {
        id: 'dateTime',
        label: 'Data',
        minWidth: 170,
        format: (value: number) => moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
        id: 'keyValues',
        label: 'Chaves',
        minWidth: 170,
    },
    {
        id: 'oldValues',
        label: 'Valores anterior',
        minWidth: 170,
    },
    {
        id: 'newValues',
        label: 'Valores novo',
        minWidth: 170,
    },
    {
        id: 'ipAddress',
        label: 'IP usuario',
        minWidth: 170,
        align: 'right'
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

    const loadUsers = async () => {
        let { data } = await axios.get('api/audits');

        setRows(data);
    }

    return (
        <Paper className={classes.root}>
            <CustomTable columns={columns} rows={rows} />
        </Paper>
    );

}
export default Reports;