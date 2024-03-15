import {level, missions} from "./constants";

export function calcAccumulatedXP(
  fromLevel: number,
  currentLevel: number,
  percent: number): number {

  const percentXP = (level[currentLevel + 1] - level[currentLevel]) * (percent / 100)
  return (level[currentLevel] - level[fromLevel]) + percentXP;
}

export function calcAccumulatedMissionXP(selectedMissions: number[]): number {
  let totalXP = 0;
  missions.forEach((mission) => {
    if (selectedMissions.includes(mission.level)) {
      totalXP += mission.xp
    }
  })

  return totalXP
}