import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Box, Badge } from '@forge/react';
import { invoke } from '@forge/bridge';
import { TimeTrackingResult } from '../types.type';


const App: React.FC = () => {
  const [timeData, setTimeData] = useState<TimeTrackingResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        setLoading(true);
        const result = await invoke('getTimeTracking') as TimeTrackingResult;
        setTimeData(result);
        setError(null);
      } catch (err) {
        console.error('[Time Tracker Badge] Error fetching time data:', err);
        setError('Failed to load time tracking data');
        setTimeData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeData();
  }, []);
  
  const getBadgeAppearance = (status: TimeTrackingResult['status']) => {
    switch (status) {
      case 'green': return 'success';
      case 'yellow': return 'warning';
      case 'red': return 'important';
      default: return 'default';
    }
  };
  
  if (loading) {
    return (
      <Box padding="space.200">
        <Text size="small" color="color.text.subtlest">Loading time tracking data...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="space.200">
        <Text color="color.text.danger">{error}</Text>
      </Box>
    );
  }
  
  return (
    <Box padding="space.200">
      {timeData && (
        <Box>
          <Badge appearance={getBadgeAppearance(timeData.status) as any}>
            {timeData.timeRemaining}
          </Badge>
          {timeData.dueDate && (
            <Box padding="space.050">
              <Text size="small" color="color.text.subtlest">
                Due: {new Date(timeData.dueDate).toLocaleDateString()}
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
