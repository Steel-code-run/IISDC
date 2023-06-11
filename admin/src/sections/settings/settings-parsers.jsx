import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography} from "@mui/material";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getParsingSettings} from "../../api/parsersResponse";

function SettingsParsers(props) {
    const [selectedTimeStart, setSelectedTimeStart] = useState(null);
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

    const queryClient = useQueryClient();

    const {data: settings} = useQuery(['parsingSettings'], getParsingSettings);
    console.log(settings)

    const date = new Date(settings?.parsersWorkTimeStart);
    // date.setMilliseconds(0, 0);
    //
    // console.log(date.toISOString())

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
                                    defaultValue="yyyy-MM-ddThh:mm"
                                    onChange={(e) => console.log(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="datetime-local"
                                    label="Конец парсинга"
                                    type="datetime-local"
                                    defaultValue="yyyy-MM-ddThh:mm"
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