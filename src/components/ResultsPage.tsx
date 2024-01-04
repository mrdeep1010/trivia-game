// src/components/ResultsPage.tsx
import React from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';

interface ResultsPageProps {
  totalQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
  tryAgian: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  totalQuestions,
  correctQuestions,
  incorrectQuestions,
  tryAgian,
}) => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          Results
        </Typography>
        <Typography variant="body1" paragraph>
          Total Questions: {totalQuestions}
        </Typography>
        <Typography variant="body1" paragraph>
          Correct Answers: {correctQuestions}
        </Typography>
        <Typography variant="body1" paragraph>
          Incorrect Answers: {incorrectQuestions}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {correctQuestions === totalQuestions ? 'Congratulations! You got all answers correct!' : 'Keep trying!'}
        </Typography>
        <Typography>
          <Button variant='contained' onClick={tryAgian}>Try again</Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ResultsPage;
