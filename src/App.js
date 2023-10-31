import * as React from 'react';
import './App.css';
import OpieChat from './opieChat';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box height="100vh" display="flex">
        <Container maxWidth="xl" height="100vh" display="flex">
          <OpieChat />
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default App;
