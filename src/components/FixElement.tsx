import {Box, Typography, useTheme} from "@mui/material";
import {ProgressBarFull, ProgressBarInner} from "./styledElements";
import {FixType, IFix} from "../utilities/types";

interface IProps {
  fix: IFix,
  percent: number
}

export function FixElement(props: IProps) {

  const {fix, percent} = props
  const theme = useTheme()

  const colorMap: Record<FixType | string, string> = {
    [FixType.ordinary]: theme.palette.success.main,
    [FixType.probMinmax]: theme.palette.warning.main,
    [FixType.probRa]: theme.palette.info.main,
    [FixType.minmaxRa]: theme.palette.error.main,
    [FixType.pierce]: theme.palette.secondary.main
  }

  let color = colorMap[FixType.ordinary]

  if(fix.type === FixType.pierce) {
    color = colorMap[FixType.pierce]
  }
  if(fix.type === FixType.probRa) {
    color = colorMap[FixType.probRa]
  }
  if(fix.type === FixType.probMinmax) {
    color = colorMap[FixType.probMinmax]
  }
  if(fix.type === FixType.minmaxRa) {
    color = colorMap[FixType.minmaxRa]
  }

  return (
    <Box display={'flex'} sx={{alignItems: 'center'}}>
      <Box display={'flex'} sx={{width: '8rem', justifyContent: 'end'}}>
        <Typography sx={{mr: '.5rem'}}>{`${fix.count}x`}</Typography>
        <Typography color={color} sx={{mr: '.75rem'}}>{fix.name}</Typography>
      </Box>
      <ProgressBarFull>
        <ProgressBarInner
          bgColor={color}
          // There won't be additional changes in the array so the index can be used
          style={{
            width: `${percent}%`,
          }}
          className="progressVisualPart"
        />
      </ProgressBarFull>
    </Box>
  )

}