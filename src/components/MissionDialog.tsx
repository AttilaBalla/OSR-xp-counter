import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {missions} from "../utilities/constants";
import {Checkbox} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

export interface SimpleDialogProps {
  open: boolean
  sendChecked: (checked: number[]) => void
}

function SimpleDialog(props: SimpleDialogProps) {
  const {open, sendChecked} = props

  const [checked, setChecked] = React.useState<number[]>([])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  };

  function handleClose() {
    sendChecked(checked)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Missions</DialogTitle>
      <List sx={{pt: 0}}>
        {missions.map((mission) => {
          return (
            <ListItemButton onClick={handleToggle(mission.level)} key={mission.name}>
              <Checkbox
                color={'info'}
                edge="start"
                checked={checked.indexOf(mission.level) !== -1}
              />
              <ListItemText
                id={mission.name}
                primary={`Lvl ${mission.level} - ${mission.name}`}
                secondary={`${mission.xp} xp`}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Dialog>
  );
}

interface IProps {
  setMissions: Dispatch<SetStateAction<number[]>>
}

export function MissionDialog(props: IProps) {
  const {setMissions} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        sx={{mt: '.5rem', height: '3.5rem'}}
        color={"info"}
        variant="outlined"
        onClick={handleClickOpen}
        >
        Open
      </Button>
      <SimpleDialog
        open={open}
        sendChecked={(checked) => {
          setMissions(checked)
          setOpen(false)
        }}
      />
    </div>
  );
}