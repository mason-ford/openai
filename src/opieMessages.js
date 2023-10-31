import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const OpieMessages = ({messages, loading, onDeleteMessage}) => {

    return (
        <>
            {messages && (
                <>
                {messages.map((message, index) => (
                    <Grid container key={index} spacing={2}>
                        <Grid item xs={11} className="display-linebreak" style={{background: message.role === "user" ? '#f5f5f5' : 'white'}}>
                            <b>{message.role === "user" ? "You: " : "Opie: "}</b>
                            {message.content}
                        </Grid>
                        <Grid item xs={1} style={{background: message.role === "user" ? '#f5f5f5' : 'white'}}>
                            <Button variant="outlined" startIcon={<DeleteIcon />} value={index} onClick={(e) => onDeleteMessage(e.target.value)}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                ))}
                {messages.length === 0 ? <Grid item xs={12}>No messages, please send Opie a message below.</Grid> : "" }
                {loading ? (<Grid item xs={12}><Skeleton variant="text" sx={{ fontSize: '2rem' }} /></Grid>) : ""}
                </>
            )}
        </>
    )

};

OpieMessages.propTypes = {
    messages: PropTypes.array,
    loading: PropTypes.bool,
}

export default OpieMessages;