import MessageForm from "./MessageForm/MessageForm.tsx";
import {Box, Container} from "@mui/material";
import type {messageInterface} from "../../types";
import {useEffect, useState} from "react";
import Message from "./Message/Message.tsx";

const URL = 'http://146.185.154.90:8000/messages'

const Chat = () => {
    const [messages, setMessages] = useState<messageInterface[] | []>([]);
    const [lastTime, setLastTime] = useState<string | null>(null);

    const requestFetch = async (url: string, init = {}): Promise<messageInterface[]> => {
        const response = await fetch(url, init);
        if (!response.ok) {
            throw new Error(`${response.status}-${response.statusText}`);
        }
        return response.json();
    };

    const scrollToBottom = () => {
        const chat = document.getElementById('chat');
        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }
    };

    if (messages.length > 0) {
        setTimeout(scrollToBottom, 0);
    }


    useEffect(() => {
        let lastDate: string | null = null;
        let interval: number;

        const getNewMessages = async () => {
            if (!lastTime) {
                return;
            }

            if (lastTime) {
                try {
                    const URLTime = `${URL}?datetime=${lastTime}`;
                    const newMessages = await requestFetch(URLTime);
                    newMessages.reverse();
                    if (newMessages.length > 0) {
                        const lastDate = newMessages[0].datetime;
                        setMessages([...newMessages, ...messages]);
                        setLastTime(lastDate);
                    }
                } catch (e) {
                    console.error(e);
                }

            }
        }


        const getAllMessages = async () => {
            try {
                const allMessages = await requestFetch(URL);
                allMessages.reverse();
                if (allMessages.length > 0) {
                    lastDate = allMessages[0].datetime;
                    setMessages(allMessages);
                    setLastTime(lastDate);
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (!lastTime) {
            void getAllMessages();
        } else {
            interval = setInterval(getNewMessages, 2000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [lastTime, messages])

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
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    overflowY: 'scroll',
                }}
                id='chat'
            >
                {messages.map(message => {
                    return <Message key={message._id} message={message}/>
                })}
            </Box>
            <MessageForm/>
        </Container>
    );
};

export default Chat;