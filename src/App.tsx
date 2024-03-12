import {ChangeEvent, Dispatch, SetStateAction, useState} from 'react'
import {Box, Stack, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {XpDetailsPanel} from "./components/XpDetailsPanel";
import {TitleTypography} from "./components/styledElements";

function App() {

  const [level, setLevel] = useState<string>("")
  const [percent, setPercent] = useState<string>("0")
  const [progress, setProgress] = useState<string>("0")
  const [fromLevel, setFromLevel] = useState<string>("")
  const [toLevel, setToLevel] = useState<string>("")

  function setValue(
    value: string,
    minValue: number,
    maxValue: number,
    setter: Dispatch<SetStateAction<string>>) {
    const intValue = parseInt(value);
    if (intValue > maxValue || intValue < minValue) {
      return
    } else {
      setter(value)
    }
  }

  return (
    <Box sx={{maxWidth: '1440px', margin: 'auto', padding: '2rem'}}>
      <Grid container spacing={4}>
        <Grid sm={4}>
          <TitleTypography>Character</TitleTypography>
          <Stack direction={'row'} spacing={2} sx={{mt: '0.5rem'}}>
            <TextField
              type={'number'}
              label={'Level'}
              value={level}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value, 1, 99, setLevel)
              }}
            />
            <TextField
              type={'number'}
              label={'Percent'}
              value={percent}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value, 0, 100, setPercent)
              }}/>
          </Stack>
        </Grid>
        <Grid sm={2}>
          <TitleTypography>Progress</TitleTypography>
          <TextField
            sx={{mt: '0.5rem', width: '100%'}}
            type={'number'}
            label={'Progressed %'}
            value={progress}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value, 0, 100, setProgress)
            }}/>
        </Grid>
        <Grid sm={6}>
          <TitleTypography>Show Range</TitleTypography>
          <Stack direction={'row'} spacing={2} sx={{mt: '0.5rem'}}>
            <TextField
              type={'number'}
              label={'From level'}
              value={fromLevel}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value, 1, 99, setFromLevel)
              }}
            />
            <TextField
              type={'number'}
              label={'To level'}
              value={toLevel}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value, 1, 100, setToLevel)
              }}
            />
          </Stack>
        </Grid>
        <Grid xs={12}>
          {level ? <XpDetailsPanel
              title={'Current level'}
              fromLevel={parseInt(level)}
              toLevel={parseInt(level) + 1}
              percent={parseFloat(percent)}
              milestonePercent={parseFloat(progress)}
            />
            : null}
        </Grid>
        <Grid xs={12}>
          {fromLevel && toLevel ? <XpDetailsPanel
              title={'Overall progress'}
              currentLevel={parseInt(level)}
              fromLevel={parseInt(fromLevel)}
              toLevel={parseInt(toLevel)}
              percent={parseFloat(percent)}
              milestonePercent={parseFloat(progress)}
            />
            : null}
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
