import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
import { TimeTrackingResult } from '../types.type';

interface IssueData {
  id: string;
  key: string;
  fields: {
    duedate?: string;
    summary: string;
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

const resolver = new Resolver();

function calculateTimeRemaining(dueDate?: string): TimeTrackingResult {
  if (!dueDate) {
    return {
      timeRemaining: 'No due date',
      status: 'gray'
    };
  }

  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      timeRemaining: `${Math.abs(diffDays)} days overdue`,
      status: 'red',
      dueDate
    };
  } else if (diffDays === 0) {
    return {
      timeRemaining: 'Due today',
      status: 'red',
      dueDate
    };
  } else if (diffDays === 1) {
    return {
      timeRemaining: '1 day left',
      status: 'yellow',
      dueDate
    };
  } else if (diffDays <= 3) {
    return {
      timeRemaining: `${diffDays} days left`,
      status: 'yellow',
      dueDate
    };
  } else {
    return {
      timeRemaining: `${diffDays} days left`,
      status: 'green',
      dueDate
    };
  }
}

resolver.define('getTimeTracking', async (req: any): Promise<TimeTrackingResult> => {
  try {
    const issueKey = req.context.extension.issue.key;
    console.log('[Time Tracker Badge] Fetching time tracking data for issue:', issueKey);

    const response = await api.asUser().requestJira(
      route`/rest/api/3/issue/${issueKey}?fields=duedate,summary,status,created,updated`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch issue: ${response.status}`);
    }

    const issue: IssueData = await response.json();
    console.log('[Time Tracker Badge] Issue data:', issue);

    const result = calculateTimeRemaining(issue.fields.duedate);
    console.log('[Time Tracker Badge] Time tracking result:', result);

    return result;
  } catch (error) {
    console.error('Error fetching time tracking data:', error);
    return {
      timeRemaining: 'Error loading',
      status: 'gray'
    };
  }
});

export const handler: any = resolver.getDefinitions();
