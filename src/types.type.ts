export type TimeStatus = 'green' | 'yellow' | 'red' | 'gray';

export type TimeData = {
  timeRemaining: string;
  status: TimeStatus;
};

export interface TimeTrackingResult {
  timeRemaining: string;
  status: TimeStatus;
  dueDate?: string;
}