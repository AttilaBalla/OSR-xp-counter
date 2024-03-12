import {Box, Paper} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {IProgressBar, level, progressBarTypes} from "../utilities/constants";
import {ExperienceNumber} from "./ExperienceNumber";
import {calcAccumulatedXP} from "../utilities/helpers";
import {MultiPartProgress} from "./MultiPartProgress";
import {StatTypography, TitleTypography} from "./styledElements";

interface IProps {
  title: string,
  fromLevel: number,
  toLevel: number,
  percent: number,
  currentLevel?: number
  milestonePercent: number
}

export function XpDetailsPanel(props: IProps) {

  const {title, fromLevel, toLevel, currentLevel, percent, milestonePercent} = props;

  const totalXP = level[toLevel] - level[fromLevel]
  const progressedPercent = milestonePercent - percent
  const accumulatedXP = currentLevel ?
    calcAccumulatedXP(fromLevel, currentLevel, percent)
    : (totalXP * (percent / 100))
  const progressedXP = currentLevel ?
    calcAccumulatedXP(fromLevel, currentLevel, percent + progressedPercent)
    : (totalXP * ((percent + progressedPercent) / 100))
  const remainingXP = totalXP - accumulatedXP - (progressedXP - accumulatedXP)
  const gainedXP = currentLevel ? null : (totalXP / 100) * progressedPercent
  const accumulatedPercent = (accumulatedXP / totalXP) * 100 // blue progress bar part
  const gainedPercent = ((progressedXP / totalXP) * 100) - accumulatedPercent // orange progress bar part
  const totalGainedPercent = currentLevel ? accumulatedPercent + gainedPercent : 0

  const progressbarParts: IProgressBar[] = [
    {percent: accumulatedPercent, color: progressBarTypes.primary},
  ]

  if (progressedPercent > 0) {
    progressbarParts.push({
      percent: progressedPercent ? gainedPercent : 0,
      color: progressBarTypes.secondary
    })
  }

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
        <Grid xs={4}>
          <StatTypography>Total XP needed</StatTypography>
          <ExperienceNumber xp={totalXP}/>
        </Grid>
        <Grid xs={4}>
          {gainedXP ? <StatTypography>XP gained</StatTypography> : null}
          {gainedXP ? <ExperienceNumber xp={gainedXP}/> : null}
          {totalGainedPercent ? <StatTypography>Percent to target level</StatTypography> : null}
          {totalGainedPercent ? `${totalGainedPercent.toFixed(2)}%` : null}
          {totalGainedPercent && gainedPercent ? ` (${gainedPercent.toFixed(2)}%)` : null}
        </Grid>
        <Grid xs={4}>
          <StatTypography>XP remaining</StatTypography>
          {remainingXP >= 0 ? <ExperienceNumber xp={remainingXP}/> : null}
        </Grid>
      </Grid>
    </Paper>
  )
}