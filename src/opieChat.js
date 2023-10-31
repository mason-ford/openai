import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import OpieMessages from './opieMessages';
import OpieForm from './opieForm';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const OpieChat = () => {

    const configuration = new Configuration({
        organization: "opious",
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const [prompt, setPrompt] = useState("");
    const [systemMessage, setSystemMessage] = useState("You are a helpful product manager for a global telecommunications company.");
    const [messages, setMessages] = useState([]);
    const [temperature, setTemperature] = useState(0.5);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const addMessage = (message) => {
        return setMessages((prev) => {
            return [...prev, message]
        })
    }

    const deleteMessage = (index) => {
        console.log("Delete "+index);
        const newMessages = [...messages];
        console.log(newMessages);
        newMessages.splice(index, 1);
        console.log(newMessages);
        setMessages(newMessages);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newMessages = [...messages];
        newMessages.unshift({"role": "system", "content": systemMessage});
        newMessages.push({"role": "user", "content": prompt});

        addMessage({"role": "user", "content": prompt});
        try {
            setPrompt("");
            const result = await openai.createChatCompletion({
                model: "gpt-4",
                messages: newMessages,
                temperature: temperature,
                max_tokens: 4000,
            });
            addMessage(result.data.choices[0].message);
        } catch (e) {
            console.log(e);
            setAlertContent(e.message + " - see console for additional information.");
            setAlert(true);
        }
        setLoading(false);
    };


    return (
        <Stack spacing={1}>
            {alert ? <Alert severity='error' onClose={() => { setAlert(false) }}>{alertContent}</Alert> : <></>}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={11}>
                    <Typography variant="h5" className="header-message">OpieAPI</Typography>
                </Grid>
                <Grid item xs={1} align="right">
                    <img src='opie.png'width={30} alt="Opie" />
                </Grid>
            </Stack>
            <Item>
                <OpieMessages 
                    messages={messages}
                    loading={loading}
                    onDeleteMessage={deleteMessage}
                />
            </Item>
            <Item>
                <OpieForm
                    prompt={prompt}
                    onPromptChange={setPrompt}
                    loading={loading}
                    systemMessage={systemMessage}
                    onSystemMessageChange={setSystemMessage}
                    temperature={temperature}
                    onTemperatureChange={setTemperature}
                    onSubmit={handleSubmit}
                />
            </Item>
        </Stack>
    );
}

export default OpieChat;