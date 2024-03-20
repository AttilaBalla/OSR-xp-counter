import {Box, Divider, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {FixElement} from "./FixElement";
import {ChangeEvent, useState} from "react";

interface IProps {
  fixes: Record<string, number>
}
export function FixListerPanel(props: IProps) {

  const {fixes} = props;

  const [sortBy, setSortBy] = useState<string>('name')

  const handleSetSortBy = (event: ChangeEvent<HTMLInputElement>) => {
    setSortBy((event.target as HTMLInputElement).value);
  };

  const highestFixCount = fixes ? Object.values(fixes).reduce(function (prev, current) {
    return (prev && prev > current) ? prev : current
  }) : 0 //returns object

  const sortedFixList = sortBy === 'name' ? Object.keys(fixes).sort() : Object.values(fixes).sort()

  return (
    <>
      <Box sx={{mt: '1rem'}}>
        <Typography>Sort By:</Typography>
        <RadioGroup
          row
          value={sortBy}
          onChange={handleSetSortBy}
        >
          <FormControlLabel value="name" control={<Radio/>} label="Name"/>
          <FormControlLabel value="value" control={<Radio/>} label="Value"/>
        </RadioGroup>
      </Box>
      <Divider sx={{my: '1rem'}}/>
      {fixes ? Object.keys(fixes).sort().map((fix) => {
        return <FixElement name={fix} percent={(fixes[fix] / highestFixCount) * 100} value={fixes[fix]}/>
      }) : null}
    </>
  )
}