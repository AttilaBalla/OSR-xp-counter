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

export function countFixes(fixes: string[] | undefined) {

  if(!fixes) return;

  const knownFixes:string[] = []
  const fixesCount: Record<string, number> = {}

  fixes.forEach((fix) => {
    const fixName = fix.split(' ')[0]
    if(knownFixes.includes(fixName)) {
      fixesCount[fixName] += 1
    } else {
      knownFixes.push(fixName)
      fixesCount[fixName] = 1
    }
  })

  return fixesCount
}