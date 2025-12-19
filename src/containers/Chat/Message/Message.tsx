import React from 'react';
import {Box, Typography} from "@mui/material";
import type {messageInterface} from "../../../types";
import dayjs from "dayjs";

interface Props {
    message: messageInterface
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <Box>
            <Typography
                sx={{marginBottom: '0',
                    marginLeft: 1,
                    fontWeight: 'bold',
                    color: 'text.secondary',
                    fontSize: '10px',
            }}
            >
                {message.author}
            </Typography>
            <Box
                sx={{
                    width: '400px',
                    margin: '10px',
                    padding: '8px 16px',
                    wordBreak: 'break-all',
                    borderRadius: '16px',
                    bgcolor: '#d6d6d6',
                    color: 'text.primary',
                    boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                }}
            >
                <Typography variant="body1">{message.message}</Typography>
                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5,
                        fontSize: '0.7rem',
                        opacity: 0.8,
                    }}
                >{dayjs(message.datetime).format('DD.MM.YYYY (dddd) - HH:mm')}</Typography>
            </Box>
        </Box>
    );
};

export default Message;