export interface StudentScore {
  name: string;
  gender: 'M' | 'F';
  isNRI: 'Y' | 'N';
  score: number;
}

export interface ScoreStatItem {
  name: string;
  range: string;
  count: number;
  color: string;
}