import {level, missions, weaponNames} from "./constants";

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

  if (!fixes) return;

  const knownFixes: string[] = []
  const fixesList: { name: string, count: number }[] = []

  fixes
    .filter((fix) => { // filter out mistakes made by the script
      return fix !== ''
    })
    .forEach((fix) => {
      const fixName = fix.split(' ')[0]
      if (knownFixes.includes(fixName)) {
        const index = fixesList.findIndex((fix) => {
          return fix.name === fixName
        })
        fixesList[index].count += 1
      } else {
        if (!weaponNames.includes(fixName)) {
          knownFixes.push(fixName)
          fixesList.push({name: fixName, count: 1})
        }
      }
    })

  return fixesList
}