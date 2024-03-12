// MIN = Minimum expected value
// MAX = Maximum expected value
// Function to normalise the values (MIN / MAX could be integrated)
import {level} from "./constants";

export function normalizeValue(min: number, max: number, value: number): number {
  return ((value - min) * 100) / (max - min)
}

export function calcAccumulatedXP(
  fromLevel: number,
  currentLevel: number,
  percent: number): number {

  const percentXP = (level[currentLevel + 1] - level[currentLevel]) * (percent / 100)
  return (level[currentLevel] - level[fromLevel]) + percentXP;
}