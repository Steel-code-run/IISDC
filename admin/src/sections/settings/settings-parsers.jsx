import React from 'react';
import {Card, CardContent, CardHeader, Checkbox, FormControlLabel, Stack, Typography} from "@mui/material";

function SettingsParsers(props) {
    return (
        <form>
            <Card>
                <CardHeader>
                    subheader="Manage the parsers"
                    title="Parsers"
                </CardHeader>
                 <CardContent>
                     <Stack spacing={1}>
                         <Typography variant="h6">
                             Parsers
                         </Typography>
                         <Stack>
                             <FormControlLabel
                                 control={<Checkbox defaultChecked />}
                                 label="Email"
                             />
                             <FormControlLabel
                                 control={<Checkbox defaultChecked />}
                                 label="Push Notifications"
                             />
                             <FormControlLabel
                                 control={<Checkbox />}
                                 label="Text Messages"
                             />
                             <FormControlLabel
                                 control={<Checkbox defaultChecked />}
                                 label="Phone calls"
                             />
                         </Stack>
                     </Stack>
                 </CardContent>
            </Card>
        </form>
    );
}

export default SettingsParsers;