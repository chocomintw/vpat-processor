import { useState } from 'react';
import './App.css';
import { Button, Container, CopyButton, createTheme, Grid, MantineProvider, Textarea, TextInput } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Montserrat',
  primaryColor: 'cyan',
  defaultRadius: 'lg',
});

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex characters
};

function processChatlog(chatlog: string, name: string) {
  if (!name.trim()) {
    return ""; // Return empty string if name is empty or just whitespace
  }

  const escapedName = escapeRegExp(name);
  const regex = new RegExp(`^(.*${escapedName}).*`, "gm"); // I hate this but it's working
  const matches = chatlog.match(regex);
  return matches ? matches.join("\n") : "";
}

function App() {
  const [chat, setChat] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Container>
          <Textarea
            label="Chatlog"
            placeholder="Paste your chatlog here."
            value={chat}
            onChange={(event) => setChat(event.currentTarget.value)}
          />
            <Grid justify='flex-end' align='flex-start' mt={'md'} ml={"10px"}>
              <Grid.Col span={3}>
                <TextInput
                placeholder="Applicant Name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                error={!name.trim() && "Name cannot be empty!"}
                />
              </Grid.Col>
              <Grid.Col span="content">
                <CopyButton value={processChatlog(chat, name)}>
                  {({ copied, copy }) => (
                  <Button
                    color={copied ? 'teal' : 'blue'}
                    onClick={copy}
                    disabled={!processChatlog(chat, name).trim()}
                    aria-label={copied ? 'Chatlog parsed' : 'Parse chatlog'}
                  >
                    {copied ? 'Parsed' : 'Parse'}
                  </Button>
                  )}
                </CopyButton>
              </Grid.Col>
            </Grid>
        </Container>
      </MantineProvider>
    </>
  );
}

export default App;