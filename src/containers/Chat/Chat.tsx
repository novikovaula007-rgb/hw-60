import MessageForm from "./MessageForm/MessageForm.tsx";
import {Container} from "@mui/material";

const Chat = () => {
    return (
        <Container fixed>
            <MessageForm/>
        </Container>
    );
};

export default Chat;