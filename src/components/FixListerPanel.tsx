import {Box, Divider, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {FixElement} from "./FixElement";
import {ChangeEvent, useState} from "react";

interface IProps {
  fixes: { name: string, count: number }[]
}
export function FixListerPanel(props: IProps) {

  const {fixes} = props;

  const [sortBy, setSortBy] = useState<string>('name')

  const handleSetSortBy = (event: ChangeEvent<HTMLInputElement>) => {
    setSortBy((event.target as HTMLInputElement).value);
  };

  const mostOccurredFix = fixes ? Object.values(fixes).reduce(function (prev, current) {
    return (prev && prev.count > current.count) ? prev : current
  }).count : 0 //returns object

  const sortedFixList = sortBy === 'name' ?
    fixes.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) :
    fixes.sort((a, b) => b.count - a.count)


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
      {sortedFixList.map((fix) => {
        return <FixElement name={fix.name} percent={(fix.count / mostOccurredFix) * 100} value={fix.count}/>
      })}
    </>
  )
}