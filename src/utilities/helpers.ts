import {fixesMinMaxRa, fixesPierce, fixesProbMinMax, fixesProbRa, level, missions, weaponNames} from "./constants";
import {FixType, IFix} from "./types.ts";

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

export function countFixes(fixes: string[] | undefined, suffixMode: boolean = false) {

  if (!fixes) return;

  const knownFixes: string[] = []
  const fixesList: IFix[] = []

  fixes
    .filter((fix) => { // filter out mistakes made by the script
      return fix !== ''
    })
    .forEach((fix) => {
      const fixName = suffixMode ? fix.split('').reverse()[0] : fix.split(' ')[0]
      if (knownFixes.includes(fixName)) {
        const index = fixesList.findIndex((fix) => {
          return fix.name === fixName
        })
        fixesList[index].count += 1
      } else {
        if (!weaponNames.includes(fixName)) {
          knownFixes.push(fixName)
          fixesList.push({name: fixName, count: 1, type: setFixType(fixName)})
        }
      }
    })

  return fixesList
}

function setFixType(fix: string): FixType {
  if(fixesProbMinMax.includes(fix)) return FixType.probMinmax
  if(fixesPierce.includes(fix)) return FixType.pierce
  if(fixesProbRa.includes(fix)) return FixType.probRa
  if(fixesMinMaxRa.includes(fix)) return FixType.minmaxRa

  return FixType.ordinary
}