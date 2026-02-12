export interface DemoResult {
  score: number;
  status: string;
  lastPost: string;
  botRate: string;
  trend: string;
  timeline: number[];
  similarity: number;
  timing: number;
  account: number;
  language: number;
}

export const demoResults: Record<'alive' | 'dying' | 'dead', DemoResult> = {
  alive: {
    score: 94,
    status: '🟢 ALIVE',
    lastPost: '2h ago',
    botRate: '8%',
    trend: '↗️ +12%',
    timeline: [65, 70, 68, 72, 75, 80, 78, 85, 88, 82, 90, 94],
    similarity: 8,
    timing: 12,
    account: 5,
    language: 85,
  },
  dying: {
    score: 38,
    status: '🟡 DYING',
    lastPost: '47 days',
    botRate: '41%',
    trend: '↘️ -34%',
    timeline: [85, 78, 70, 60, 50, 42, 35, 28, 22, 18, 12, 8],
    similarity: 41,
    timing: 55,
    account: 38,
    language: 35,
  },
  dead: {
    score: 7,
    status: '🔴 DEAD',
    lastPost: '2.3 yrs',
    botRate: '89%',
    trend: '⏹️ None',
    timeline: [60, 45, 25, 10, 3, 1, 0, 0, 0, 0, 0, 0],
    similarity: 89,
    timing: 92,
    account: 78,
    language: 12,
  },
};

export const demoUrls: Record<'alive' | 'dying' | 'dead', string> = {
  alive: 'https://reddit.com/r/programming',
  dying: 'https://forums.oldgamesite.net',
  dead: 'https://myspace.com/oldband2008',
};
