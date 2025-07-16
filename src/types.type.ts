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

export interface IssueData {
  id: string;
  key: string;
  fields: {
    duedate?: string;
    summary: string;
    timeoriginalestimate?: number;
    timetracking: {
      originalEstimate?: string;
      remainingEstimate?: string;
      timeSpent?: string;
      originalEstimateSeconds?: number;
      remainingEstimateSeconds?: number;
      timeSpentSeconds?: number;
    };
    status: {
      name: string;
      statusCategory: {
        key: string;
      };
    };
    created: string;
    updated: string;
  };
}
