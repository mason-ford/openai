import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Slider from '@mui/material/Slider';

const sliderMarks = [
    {
        value: 0,
        label: "Deterministic",
    },
    {
        value: 2,
        label: "Random",
    }
]

const OpieForm = ({ prompt, 
                    onPromptChange, 
                    loading, 
                    systemMessage, 
                    onSystemMessageChange, 
                    temperature,
                    onTemperatureChange,
                    onSubmit
                }) => {

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={11}>
                    <TextField
                        value={prompt}
                        placeholder="Send a message..."
                        fullWidth
                        multiline
                        rows={3}
                        size='small'
                        onChange={(e) => onPromptChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1} align="left">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading || prompt.length === 0}
                    >
                        <SendIcon />
                    </Button>
                </Grid>
                <Grid item xs={8} style={{paddingRight: '50px'}}>
                    <TextField
                        value={systemMessage}
                        label="Opie Behaviour"
                        placeholder='Set the behavior of Opie, such as "You are a helpful assistant."'
                        fullWidth
                        size='small'
                        onChange={(e) => onSystemMessageChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Slider
                        value={temperature}
                        step={.1}
                        min={0}
                        max={2}
                        marks={sliderMarks}
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        onChange={(e) => onTemperatureChange(e.target.value)}
                    />  
                </Grid>
            </Grid>
        </form>
    )

};

OpieForm.propTypes = {
    messages: PropTypes.array,
    loading: PropTypes.bool,
}

export default OpieForm;