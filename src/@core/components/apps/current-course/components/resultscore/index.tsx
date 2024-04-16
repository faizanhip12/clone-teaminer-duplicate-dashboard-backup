import React from 'react';
import { Box, BoxProps, Card, Typography, styled } from '@mui/material';
import CircularWithValueLabel from '../progressbar';

interface MyCurrentCourse {
  title?: string;
}

const ScoreBox = styled('div')<BoxProps>(({ theme }) => ({

  marginBottom: '30px',
  textAlign:'center',
  [theme.breakpoints.down('md')]: {},
}));

const ResultScore = (props: MyCurrentCourse) => {
  return (
    <Box>
      <Card sx={{ padding: 10 }}>
        <ScoreBox>
            <Box style={{ marginBottom:'20px'}}>
          <CircularWithValueLabel/>
            </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography color='white'>{props.title}</Typography>
          </Box>
        </ScoreBox>
      </Card>
    </Box>
  );
};

export default ResultScore;
