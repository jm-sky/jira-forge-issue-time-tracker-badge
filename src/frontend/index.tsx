import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Box, Badge } from '@forge/react';
import { invoke } from '@forge/bridge';
import { TimeData } from './types.type';

const App: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  
  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' })
      .then((result: unknown) => setData(result as string));
      
    // Mock time data for now
    setTimeData({
      timeRemaining: '2 days left',
      status: 'yellow'
    });
  }, []);
  
  const getBadgeAppearance = (status: TimeData['status']) => {
    switch (status) {
      case 'green': return 'success';
      case 'yellow': return 'warning';
      case 'red': return 'important';
      default: return 'default';
    }
  };
  
  return (
    <Box padding="space.200">
      <Text size="large" weight="bold">Time Tracker Badge</Text>
      
      {timeData && (
        <Box padding="space.100">
          <Badge appearance={getBadgeAppearance(timeData.status) as any}>
            {timeData.timeRemaining}
          </Badge>
        </Box>
      )}
      
      <Box padding="space.100">
        <Text>{data ? data : 'Loading...'}</Text>
      </Box>
    </Box>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
