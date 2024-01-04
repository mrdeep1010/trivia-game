import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

interface QuestionCardProps {
    question: string;
    options: string[];
    correctAnswer: string;
    onNext: () => void;
    onAnswerResult: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    options,
    correctAnswer,
    onNext,
    onAnswerResult
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>(options);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isCorrect === null) {
            setShuffledOptions(shuffleArray(options));
        }
    }, [isCorrect, options]);

    const handleOptionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        if (null !== selectedOption) {
            const isAnswerCorrect = selectedOption === correctAnswer;
            setIsCorrect(isAnswerCorrect);
            onAnswerResult(isAnswerCorrect);
            setError(null);
        }
        else {
            setError("Please select one option !");
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setIsCorrect(null);
        onNext();
    }

    const convertToHtml = (encodedString: string | null) => {
        const parser = new DOMParser();
        if (encodedString) {
            const doc = parser.parseFromString(encodedString, 'text/html');
            return doc.body.innerHTML;
        }
        return encodedString;
    }

    return (
        <Container component="main" maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
            <Card variant='elevation' sx={{ width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" dangerouslySetInnerHTML={{ __html: question }} />
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={convertToHtml(selectedOption)}
                            onChange={handleOptionSelect}
                        >
                            {shuffledOptions.map((option) => (
                                <FormControlLabel
                                    key={convertToHtml(option)}
                                    value={convertToHtml(option)}
                                    control={<Radio />}
                                    label={convertToHtml(option)}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <div>
                        {selectedOption === null && error && <div style={{ color: 'red', padding: 10 }}>{error}</div>}
                        {(isCorrect === null) && (<Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>)} </div>
                    {isCorrect !== null && (
                        <div>
                            {isCorrect ? (
                                <Typography variant="h6" style={{ color: 'green' }}>Correct!</Typography>
                            ) : (
                                <div>
                                    <Typography variant="h6" style={{ color: 'red' }}>Wrong!</Typography>
                                    <Typography variant="body1">
                                        <b>Correct Answer: </b>{correctAnswer}
                                    </Typography>
                                    {/* Add explanation if needed */}
                                </div>
                            )}
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export default QuestionCard;
