import MessageForm from "./MessageForm/MessageForm.tsx";
import {Box, Container} from "@mui/material";
import type {messageInterface} from "../../types";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

const URL = 'http://146.185.154.90:8000/messages'

const Chat = () => {
    const [messages, setMessages] = useState<messageInterface[] | []>([])
    const [lastTime, setLastTime] = useState<string | null>(null)

    const requestFetch = async (url: string, init = {}): Promise<messageInterface[]> => {
        const response = await fetch(url, init);
        if (!response.ok) {
            throw new Error(`${response.status}-${response.statusText}`);
        }
        return response.json();
    };

    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const allMessages = await requestFetch(URL);
                const lastDate = dayjs(allMessages.reverse()[0].datetime).format('DD.MM.YYYY (dddd) - HH:mm')
                setMessages(allMessages)
                setLastTime(lastDate)
            } catch (e) {
                console.log(e);
            }
        }

        void getAllMessages()
    }, [])


    return (
        <Container fixed>
            <Box
                sx={{
                    width: '500px',
                    height: '400px',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    marginBottom: '10px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
            </Box>
            <MessageForm/>
        </Container>
    );
};

export default Chat;