import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Button} from "@mui/material";
import {useState} from "react";
import * as React from "react";

const MessageForm = () => {
    const [message, setMessage] = useState<string>('')

    const changeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.trim().length) {
            alert('You can not send empty field')
        }
        setMessage('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField
                    id="text"
                    label="Your message"
                    multiline
                    rows={4}
                    placeholder="Enter your message here"
                    sx={{width: '500px'}}
                    value={message}
                    onChange={changeMessage}
                />
                <Button variant="contained"
                        type="submit"
                        color="primary"
                        sx={{marginLeft: '10px'}}
                >
                    <SendIcon/>
                </Button>
            </form>
        </div>
    );
};

export default MessageForm;