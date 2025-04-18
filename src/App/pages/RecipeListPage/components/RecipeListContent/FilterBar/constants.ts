import { SwitcherOption } from '@components/Switcher';

export type WeightGoal = 'low' | 'neutral' | 'high';
export type TotalTime = 'quick ' | 'medium' | 'long ';

export const weightGoalOptions: SwitcherOption<WeightGoal>[] = [
  { value: 'low', label: 'low' },
  { value: 'neutral', label: '~ calorie ~' },
  { value: 'high', label: 'high' },
];

export const totalTimeOptions: SwitcherOption<TotalTime>[] = [
  { value: 'quick ', label: 'quick ' },
  { value: 'medium', label: '~ dish ~' },
  { value: 'long ', label: 'long ' },
];
