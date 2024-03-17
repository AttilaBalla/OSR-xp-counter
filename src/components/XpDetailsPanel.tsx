import {Box, Paper} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {IProgressBar, level, ProgressBarTypes} from "../utilities/constants";
import {ExperienceNumber} from "./ExperienceNumber";
import {calcAccumulatedMissionXP, calcAccumulatedXP} from "../utilities/helpers";
import {MultiPartProgress} from "./MultiPartProgress";
import {StatTypography, TitleTypography} from "./styledElements";
import {PercentXPGainPanel} from "./PercentXPGainPanel";

interface IProps {
  title: string,
  fromLevel: number,
  toLevel: number,
  percent: number,
  currentLevel?: number
  progressedPercent: number
  selectedMissions: number[]
}

export function XpDetailsPanel(props: IProps) {

  const {title, fromLevel, toLevel, currentLevel, percent, progressedPercent, selectedMissions} = props

  const totalXP = level[toLevel] - level[fromLevel]
  const missionXP = calcAccumulatedMissionXP(selectedMissions)
  // the difference between base % and progressed %
  const gainedPercent = progressedPercent - percent

  // used for overall base XP calculation if current level is given between a range
  const accumulatedXP = currentLevel ?
    calcAccumulatedXP(fromLevel, currentLevel, percent)
    : (totalXP * (percent / 100))

  // same as above but for progressed XP
  const progressedXP = currentLevel ?
    calcAccumulatedXP(fromLevel, currentLevel, percent + gainedPercent)
    : (totalXP * ((percent + gainedPercent) / 100))

  const remainingXP = totalXP - accumulatedXP - missionXP - (progressedXP - accumulatedXP)

  // only calculated for the current level bar (percent is given)
  const gainedXP = currentLevel ? null : (totalXP / 100) * gainedPercent

  // has to be calculated for overall progress - blue progress bar part
  const basePercent = (accumulatedXP / totalXP) * 100

  const missionPercent = (missionXP / totalXP) * 100

  // overall gained % towards the target level
  const overallGainedPercent = ((progressedXP / totalXP) * 100) - basePercent

  // overall progress in % towards the target level - only calculated for overall progress
  const overallBasePercent = currentLevel ? basePercent + overallGainedPercent + missionPercent: 0

  const progressbarParts: IProgressBar[] = [
    {
      percent: basePercent,
      color: ProgressBarTypes.primary
    },
    {
      percent: missionPercent,
      color: ProgressBarTypes.info
    },
    {
      percent: gainedPercent ? overallGainedPercent : 0,
      color: ProgressBarTypes.secondary
    }
  ]

  return (
    <Paper elevation={2} sx={{padding: '2rem'}}>
      <TitleTypography>{title}</TitleTypography>
      <Box display={'flex'} sx={{justifyContent: 'space-between'}}>
        <Box>
          <StatTypography>
            Level {fromLevel}
          </StatTypography>
          <ExperienceNumber xp={level[fromLevel]}/>
        </Box>
        <Box>
          <StatTypography>
            Level {toLevel}
          </StatTypography>
          <ExperienceNumber xp={level[toLevel]}/>
        </Box>
      </Box>
      <MultiPartProgress parts={progressbarParts}/>
      <Grid container sx={{my: '1rem'}}>
        <Grid xs={3}>
          <StatTypography>Total XP needed</StatTypography>
          <ExperienceNumber xp={totalXP}/>
        </Grid>
        <Grid xs={3}>
          {!currentLevel ? <PercentXPGainPanel
            title={'XP gained'}
            mode={'xp'}
            baseValue={gainedXP}
          /> : null}
          {overallBasePercent ? <PercentXPGainPanel
            title={'Progress in %'}
            mode={'percent'}
            baseValue={overallBasePercent}
            progressValue={overallGainedPercent}
            missionValue={missionPercent}
          /> : null}
        </Grid>
        <Grid xs={3}>
          {!currentLevel ?
              <PercentXPGainPanel
                title={'Total progress'}
                mode={'percent'}
                baseValue={basePercent + gainedPercent + missionPercent}
                progressValue={gainedPercent}
                missionValue={missionPercent}
              /> : null}
        </Grid>
        <Grid xs={3}>
          <StatTypography>XP remaining</StatTypography>
          {remainingXP >= 0 ? <ExperienceNumber xp={remainingXP}/> : null}
        </Grid>
      </Grid>
    </Paper>
  )
}