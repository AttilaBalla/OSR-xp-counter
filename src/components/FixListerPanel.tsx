import {Box, Divider} from "@mui/material";
import {FixElement} from "./FixElement";
import {FixType, IFix} from "../utilities/types.ts";

interface IProps {
  fixes: IFix[]
  filterOrdinary: boolean
  sortBy: string
}

export function FixListerPanel(props: IProps) {

  const {fixes, filterOrdinary, sortBy} = props;

  const sortedFixList = sortBy === 'name' ?
    fixes.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) :
    fixes.sort((a, b) => b.count - a.count)

  const mostOccurredFix = fixes ? Object.values(fixes).reduce(function (prev, current) {
    return (prev && prev.count > current.count) ? prev : current
  }).count : 0 //returns object

  return (
    <Box sx={{width: '100%'}}>
      <Divider sx={{my: '1rem'}}/>
      {sortedFixList.map((fix) => {
        if (filterOrdinary) {
          return fix.type !== FixType.ordinary ?
            <FixElement fix={fix} percent={(fix.count / mostOccurredFix) * 100}/> : null
        } else {
          return <FixElement fix={fix} percent={(fix.count / mostOccurredFix) * 100}/>
        }
      })}
    </Box>
  )
}