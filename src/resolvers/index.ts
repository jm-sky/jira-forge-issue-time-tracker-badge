import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
import { IssueData, TimeTrackingResult } from '../types.type';

const resolver = new Resolver();

function getTimeRemaining(diffDays: number, dueDate: string): TimeTrackingResult {
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

function calculateTimeRemainingFromDueDate(dueDate: string): TimeTrackingResult {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return getTimeRemaining(diffDays, dueDate);
}

function calculateTimeRemainingFromOriginalEstimate(originalEstimate: number, created: string): TimeTrackingResult {
  const now = new Date();
  const createdDate = new Date(created);
  const due = new Date(createdDate.getTime() + originalEstimate * 1000);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return getTimeRemaining(diffDays, due.toISOString());
}

function calculateTimeRemaining(issue: IssueData): TimeTrackingResult {
  const dueDate = issue.fields.duedate;
  const originalEstimate = issue.fields.timeoriginalestimate;

  if (!dueDate && !originalEstimate) {
    return {
      timeRemaining: 'No due date',
      status: 'gray'
    };
  }

  if (dueDate) {
    return calculateTimeRemainingFromDueDate(dueDate);
  }

  return calculateTimeRemainingFromOriginalEstimate(originalEstimate!, issue.fields.created);
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

    const result = calculateTimeRemaining(issue);
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
