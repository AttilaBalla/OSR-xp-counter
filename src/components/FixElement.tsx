import {Box, Typography, useTheme} from "@mui/material";
import {ProgressBarFull, ProgressBarInner} from "./styledElements";
import {FixTypes} from "../utilities/types";
import {fixesProbMinMax, fixesPierce, fixesProbRa, fixesMinMaxRa} from "../utilities/constants";

interface IProps {
  name: string,
  value: number,
  percent: number
}

export function FixElement(props: IProps) {

  const {name, value, percent} = props
  const theme = useTheme()

  const colorMap: Record<FixTypes | string, string> = {
    [FixTypes.ordinary]: theme.palette.success.main,
    [FixTypes.probMinmax]: theme.palette.warning.main,
    [FixTypes.probRa]: theme.palette.info.main,
    [FixTypes.minmaxRa]: theme.palette.error.main,
    [FixTypes.pierce]: theme.palette.secondary.main
  }

  let color = colorMap[FixTypes.ordinary]

  if(fixesPierce.includes(name)) {
    color = colorMap[FixTypes.pierce]
  }
  if(fixesProbRa.includes(name)) {
    color = colorMap[FixTypes.probRa]
  }
  if(fixesProbMinMax.includes(name)) {
    color = colorMap[FixTypes.probMinmax]
  }
  if(fixesMinMaxRa.includes(name)) {
    color = colorMap[FixTypes.minmaxRa]
  }

  return (
    <Box display={'flex'} sx={{alignItems: 'center'}}>
      <Box display={'flex'} sx={{width: '8rem', justifyContent: 'end'}}>
        <Typography sx={{mr: '.5rem'}}>{`${value}x`}</Typography>
        <Typography color={color} sx={{mr: '.75rem'}}>{name}</Typography>
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