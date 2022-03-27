import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { $viewmode, updateViewmode } from '../effector/viewMode';
import { useStore } from 'effector-react';

export default function SelectViewMode() {
    const viewMode = useStore($viewmode)

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as "cards" | "table"
        localStorage.setItem('viewMode', value)
        updateViewmode(value)
    };

    useEffect(() => {
        const storeViewMode = localStorage.getItem('viewMode')
        if (storeViewMode === 'cards' || storeViewMode === 'table') updateViewmode(storeViewMode)
    }, [])

    return (
        <Box sx={{ width: 120, marginTop: 5, marginLeft: 5 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label">View mode</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={viewMode}
                    label="viewMode"
                    onChange={handleChange}
                >
                    <MenuItem value={'cards'}>Cards</MenuItem>
                    <MenuItem value={'table'}>Table</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}