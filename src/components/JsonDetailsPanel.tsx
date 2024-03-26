import {Alert, Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Switch, Typography} from "@mui/material";
import {IFixVisualizerJSON} from "../utilities/types.ts";
import {FixStatsPanel} from "./FixStatsPanel.tsx";
import {ChangeEvent, useState} from "react";
import {countFixes, validateJson} from "../utilities/helpers.ts";
import {FixListerPanel} from "./FixListerPanel.tsx";

interface IProps {
  json: IFixVisualizerJSON
}

export function JsonDetailsPanel(props: IProps) {

  const {json} = props;

  const [sortBy, setSortBy] = useState<string>('name')
  const [filterOrdinary, setFilterOrdinary] = useState<boolean>(false)
  const jsonResults = validateJson(json)

  if (!jsonResults.isValid) {
    return (
      <Box sx={{my: '1rem'}}>
        {jsonResults.errors.map((error) => {
          return (
            <Alert sx={{my: '.5rem'}} variant={'outlined'} severity={'error'}>{error}</Alert>
          )
        })}
      </Box>
    )
  }

  const prefixes = countFixes(json.fixes)
  const suffixes = countFixes(json.fixes, true)

  function handleSetSortBy(event: ChangeEvent<HTMLInputElement>) {
    setSortBy((event.target as HTMLInputElement).value);
  }

  function handleSetFilterOrdinary(event: ChangeEvent<HTMLInputElement>) {
    setFilterOrdinary(event.target.checked)
  }

  return (
    <Box sx={{width: '100%'}}>
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
          <FixStatsPanel stats={{iterations: json.iterations, totalTime: json.totalTime}}/>
        </Stack>
      </Box>
      <Divider sx={{my: '1rem'}}/>
      <Box display={'flex'}>
        {
          json.mode !== 'SUFFIX_ONLY' ?
            <FixListerPanel fixes={prefixes} sortBy={sortBy} filterOrdinary={filterOrdinary}/>
            : null
        }
        {
          json.mode !== 'PREFIX_ONLY' ?
            <FixListerPanel suffixMode={json.mode === 'PREFIX_SUFFIX'} fixes={suffixes} sortBy={sortBy}
                            filterOrdinary={filterOrdinary}/>
            : null
        }
      </Box>
    </Box>
  )
}