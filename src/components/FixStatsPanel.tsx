import {Box, Typography} from "@mui/material";

interface IProps {
  stats: {iterations: number | undefined, totalTime: string | undefined}
}
export function FixStatsPanel(props: IProps) {

  const {stats} = props;

  return (
    <Box>
      {stats.iterations ? <Typography>{`Iterations: ${stats.iterations}`}</Typography> : null}
      {stats.totalTime ?  <Typography>{`Time: ${stats.totalTime.split('.')[0]}`}</Typography>: null}
    </Box>
  )
}