import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import {PageFrame} from "../components/PageFrame";
import {TitleTypography} from "../components/styledElements";
import {ChangeEvent, useState} from "react";
import {IFixVisualizerJSON} from "../utilities/types";
import {countFixes} from "../utilities/helpers";
import {FixListerPanel} from "../components/FixListerPanel";
import {FixStatsPanel} from "../components/FixStatsPanel.tsx";

function FixVisualizer() {

  const [json, setJson] = useState<IFixVisualizerJSON>()

  const mode = json?.mode

  const fixes = countFixes(json?.fixes)
  const suffixes = countFixes(json?.fixes, true)
  function parseJson(json: string) {
    setJson(JSON.parse(json))
  }

  const [sortBy, setSortBy] = useState<string>('name')
  const [filterOrdinary, setFilterOrdinary] = useState<boolean>(false)

  function handleSetSortBy(event: ChangeEvent<HTMLInputElement>) {
    setSortBy((event.target as HTMLInputElement).value);
  }

  function handleSetFilterOrdinary(event: ChangeEvent<HTMLInputElement>) {
    setFilterOrdinary(event.target.checked)
  }

  return (
    <PageFrame>
      <TitleTypography>Fix Visualizer</TitleTypography>
      <Typography sx={{marginBottom: '1rem'}}>Copy the JSON output here to begin</Typography>
      <TextField
        sx={{width: '100%'}}
        label="JSON"
        multiline
        maxRows={5}
        onBlur={(event) => {
          parseJson(event.target.value)
        }}
      />
      <Box display={'flex'} sx={{mt: '1rem'}}>
        <Stack direction={'row'} spacing={2} sx={{alignItems: 'center'}}>
          <Typography>Sort By</Typography>
          <RadioGroup
            row
            value={sortBy}
            onChange={handleSetSortBy}
          >
            <FormControlLabel value="name" control={<Radio/>} label="Name"/>
            <FormControlLabel value="value" control={<Radio/>} label="Value"/>
          </RadioGroup>
          <Divider orientation={'vertical'} flexItem/>
          <Typography>Filter ordinary fixes</Typography>
          <Switch
            checked={filterOrdinary}
            onChange={handleSetFilterOrdinary}
          />
          <Divider orientation={'vertical'} flexItem/>
          <FixStatsPanel stats={{iterations: json?.iterations, totalTime: json?.totalTime}}/>
        </Stack>
      </Box>
      {fixes ? <FixListerPanel fixes={fixes} sortBy={sortBy} filterOrdinary={filterOrdinary}/> : null}
    </PageFrame>
  )
}


export default FixVisualizer