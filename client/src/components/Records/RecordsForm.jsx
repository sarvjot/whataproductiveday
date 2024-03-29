import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { getLogsFromServer as getRecordsFromServer } from "../../api.js";

export default function RecordsForm({ setRecords }) {
    const [day, setDay] = useState(
        localStorage.getItem("day") ? new Date(localStorage.getItem("day")) : new Date()
    );

    useEffect(() => {
        localStorage.setItem("day", day.toString());
    }, [day]);

    useEffect(() => {
        getRecordsFromServer(setRecords, null, day);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    return (
        <form className="records-form">
            <div className="records-form-text">Pick a date to query your logs</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={day}
                    onChange={(newDay) => {
                        setDay(newDay);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={null}
                            sx={{
                                height: "60px",
                                width: "200px",
                                background: "white",
                                borderRadius: "20px",
                                border: "4px solid black",

                                "@media (max-width: 1100px)": {
                                    width: "175px",
                                },
                                "@media (max-width: 650px)": {
                                    width: "150px",
                                },
                                "@media (max-width: 500px)": {
                                    width: "100px",
                                },

                                "& *": {
                                    fontFamily: "'Anek Latin' !important",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "0px !important",
                                },
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                    textAlign: "center",
                                    fontSize: "22px",
                                    height: "100%",

                                    "@media (max-width: 1100px)": {
                                        fontSize: "18px",
                                    },
                                    "@media (max-width: 650px)": {
                                        fontSize: "15px",
                                    },
                                    "@media (max-width: 500px)": {
                                        fontSize: "12px",
                                    },
                                },
                                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                    height: "100%",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "black",
                                },
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
        </form>
    );
}
