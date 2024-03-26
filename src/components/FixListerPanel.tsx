import {FixType, IFix} from "../utilities/types.ts";
import {FixElement} from "./FixElement.tsx";
import {Box} from "@mui/material";

interface IProps {
  fixes: IFix[],
  sortBy: string,
  filterOrdinary: boolean
  suffixMode?: boolean
}

export function FixListerPanel(props: IProps) {

  const {fixes, sortBy, filterOrdinary, suffixMode} = props;

  const sortedFixList = sortBy === 'name' ?
    fixes.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) :
    fixes.sort((a, b) => b.count - a.count)

  const mostOccurredFix = fixes ? Object.values(fixes).reduce(function (prev, current) {
    return (prev && prev.count > current.count) ? prev : current
  }).count : 0 //returns object

  return (
    <Box sx={{width: '100%'}}>
      {sortedFixList.map((fix) => {
        if (filterOrdinary) {
          return fix.type !== FixType.ordinary ?
            <FixElement
              suffixMode={suffixMode}
              key={fix.name}
              fix={fix}
              percent={(fix.count / mostOccurredFix) * 100}
            /> : null
        } else {
          return (
            <FixElement
              suffixMode={suffixMode}
              key={fix.name}
              fix={fix}
              percent={(fix.count / mostOccurredFix) * 100}
            />
          )
        }
      })}
    </Box>
  )
}