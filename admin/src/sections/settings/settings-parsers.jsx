import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography} from "@mui/material";

function SettingsParsers(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);


    return (
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

                            <Typography margin={'20px 0 20px 0'} variant={"h6"}>Выбор даты и времени парсинга</Typography>
                            <Stack direction={'row'} spacing={3}>

                                <TextField
                                    id="datetime-local"
                                    label="Начало парсинга"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    onChange={(e) => console.log(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="datetime-local"
                                    label="Конец парсинга"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    onChange={(e) => console.log(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Stack>


                        </Stack>
                    </Stack>
                </CardContent>
                <Divider/>
                <CardActions sx={{justifyContent: 'flex-end'}}>
                    <Button variant="contained">
                        Сохранить
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default SettingsParsers;