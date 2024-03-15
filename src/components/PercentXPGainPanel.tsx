import {PercentTypography, StatTypography, XpNumberTypography} from "./styledElements";
import {Box, useTheme} from "@mui/material";

interface IProps {
  mode: 'xp' | 'percent'
  title: string,
  baseValue: number | null,
  progressValue?: number
  missionValue?: number
}

export function PercentXPGainPanel(props: IProps) {

  const {mode, title, baseValue, progressValue, missionValue} = props
  const theme = useTheme()

  const element = mode === 'xp' ?
    <XpNumberTypography>
      {baseValue ? baseValue.toLocaleString('en-us') : null}
    </XpNumberTypography> :
    <>
      <Box display={'flex'}>
        <PercentTypography>
          {baseValue ? `${baseValue.toFixed(2)}%` : null}
        </PercentTypography>
        {progressValue ?
          <PercentTypography sx={{ml: '.5rem'}} fontColor={theme.palette.secondary.main}>
            {`(${progressValue.toFixed(2)}%)`}
          </PercentTypography> : null}
        {missionValue ?
          <PercentTypography sx={{ml: '.5rem'}} fontColor={theme.palette.info.main}>
            {`(${missionValue.toFixed(2)}%)`}
          </PercentTypography> : null}
      </Box>
    </>

  return (
    <>
      <StatTypography>{title}</StatTypography>
      {element}
    </>
  )

}