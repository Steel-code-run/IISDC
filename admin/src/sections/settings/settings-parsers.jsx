import React, {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getParsingSettings, updateParsingSettings} from "../../api/parsersReq";
import moment from "moment";
import SnackbarMessage from "../../components/snackbarMessage/SnackbarMessage";
import {useSnackbar} from "../../hooks/use-snackbar";

function SettingsParsers(props) {


    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();

    const FORMAT_TIME = 'HH:mm'
    const queryClient = useQueryClient();

    const {data: settings} = useQuery(['parsingSettings'], getParsingSettings);
    const mutation = useMutation(
        (updateData) => updateParsingSettings(updateData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["parsingSettings"])
                setOpenSnackbar(true);
                setSnackbarData({
                    msg: 'Дата успешно установлена',
                    type: 'success'
                });
            }
        });

    const formatDateInISOUTC0 = (date) => moment(Date.parse(date))
        .utcOffset(0)
        .format(FORMAT_TIME);
    const formatDateInISOUTC0Full = (data) => moment(data, FORMAT_TIME)
        //.utcOffset(0)
        .format('1970-01-01[T]HH:mm:00.000[Z]');


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        setStartDate(formatDateInISOUTC0(settings?.parsersWorkTimeStart));
        setEndDate(formatDateInISOUTC0(settings?.parsersWorkTimeEnd))

    }, [settings])

    return (
        <>
            <form>
                <Card>
                    <CardHeader
                        subheader="Управление парсерами"
                        title="Парсеры">
                    </CardHeader>
                    <Divider/>
                    <CardContent>
                        <Stack spacing={1}>

                            <Stack direction={'column'}>

                                <Typography margin={'20px 0 20px 0'} variant={"h6"}>Выбор даты и времени
                                    парсинга</Typography>
                                <Stack direction={'row'} spacing={3}>
                                    <TextField
                                        id="time"
                                        label="Время начала парсинга"
                                        type="time"
                                        value={startDate}
                                        onChange={(e) => {
                                            setStartDate(e.target.value)
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        sx={{
                                            width: '200px'
                                        }}
                                    />
                                    <TextField
                                        sx={{
                                            width: '200px'
                                        }}
                                        id="time"
                                        label="Время конца парсинга"
                                        type="time"
                                        value={endDate}
                                        onChange={(e) => {
                                            setEndDate(e.target.value)
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button variant="contained" onClick={() => {
                            mutation.mutate({
                                parsersWorkTimeStart: formatDateInISOUTC0Full(startDate),
                                parsersWorkTimeEnd: formatDateInISOUTC0Full(endDate)
                            })
                        }}>
                            Сохранить
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <SnackbarMessage type={snackbarData.type}
                             msg={snackbarData.msg}
                             openSnackbar={openSnackbar}
                             setOpenSnackbar={setOpenSnackbar}/>
        </>
    );
}

export default SettingsParsers;