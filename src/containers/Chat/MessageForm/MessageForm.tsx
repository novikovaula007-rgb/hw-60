import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Button} from "@mui/material";
import {useState} from "react";
import * as React from "react";

interface MessageForm {
    text: string;
    author: string;
}

const MessageForm = () => {
    const [message, setMessage] = useState<MessageForm>({text: '', author: ''})

    const changeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.author.trim().length || !message.text.trim().length) {
            alert('You can not send empty field')
        } else {
            const url = 'http://146.185.154.90:8000/messages';
            const data = new URLSearchParams();
            data.set('message', message.text);
            data.set('author', message.author);

            await fetch(url, {
                method: 'post',
                body: data,
            });
        }

        setMessage(prev => ({...prev, text: ''}))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField
                    id="author"
                    name="author"
                    multiline
                    placeholder="Enter your name"
                    sx={{width: '250px',
                        display: 'block',
                    }}
                    value={message.author}
                    onChange={changeMessage}
                />
                <TextField
                    id="text"
                    name="text"
                    multiline
                    rows={4}
                    placeholder="Enter your message here"
                    sx={{width: '500px'}}
                    value={message.text}
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