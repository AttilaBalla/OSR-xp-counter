import {ChangeEvent, Dispatch, SetStateAction, useState} from 'react'
import {Box, Stack, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {TitleTypography} from "../components/styledElements.tsx";
import {MissionDialog} from "../components/MissionDialog.tsx";
import {XpDetailsPanel} from "../components/XpDetailsPanel.tsx";
import Button from "@mui/material/Button";

function XpCounter() {

  const [level, setLevel] = useState<string>("")
  const [percent, setPercent] = useState<string>("0")
  const [progress, setProgress] = useState<string>("0")
  const [fromLevel, setFromLevel] = useState<string>("")
  const [toLevel, setToLevel] = useState<string>("")
  const [missions, setMissions] = useState<number[]>([])

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

  function mergeProgressIntoPercent() {
    setPercent(progress)
  }

  return (
    <Box sx={{maxWidth: '1440px', margin: 'auto', padding: '2rem'}}>
      <Grid container spacing={4}>
        <Grid sm={3}>
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
              label={'%'}
              value={percent}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value
                setValue(value, 0, 100, () => {
                  setPercent((prevState) => {
                    if (parseInt(prevState) < parseInt(value)) {
                      setProgress(value)
                    }
                    return event.target.value
                  })
                })
              }}/>
          </Stack>
        </Grid>
        <Grid sm={3}>
          <TitleTypography>Progress</TitleTypography>
          <Stack direction={'row'} spacing={2} sx={{mt: '0.5rem'}}>
            <TextField
              sx={{mt: '0.5rem', width: '100%'}}
              type={'number'}
              color={'secondary'}
              label={'Progressed %'}
              value={progress}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value, 0, 100, setProgress)
              }}/>
            <Button
              color={'secondary'}
              variant={'outlined'}
              onClick={mergeProgressIntoPercent}
              disabled={parseFloat(percent) >= parseFloat(progress)}>
              Merge
            </Button>
          </Stack>
        </Grid>
        <Grid sm={4}>
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
        <Grid sm={2}>
          <TitleTypography>Missions</TitleTypography>
          <MissionDialog setMissions={setMissions}/>
        </Grid>
        <Grid xs={12}>
          {level ? <XpDetailsPanel
              title={'Current level'}
              fromLevel={parseInt(level)}
              toLevel={parseInt(level) + 1}
              percent={parseFloat(percent)}
              progressedPercent={parseFloat(progress)}
              selectedMissions={missions}
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
              progressedPercent={parseFloat(progress)}
              selectedMissions={missions}
            />
            : null}
        </Grid>
      </Grid>
    </Box>
  )
}

export default XpCounter
