import {useEffect, useState} from "react";
import {ProgressBarFull, ProgressBarInner} from "./styledElements";
import {useTheme} from "@mui/material";
import {ProgressBarTypes} from "../utilities/constants";

interface IProps {
  parts: { percent: number, color: string }[]
}

export function MultiPartProgress(props: IProps) {

  const {parts} = props
  const theme = useTheme()

  const colorMap: Record<ProgressBarTypes | string, string> = {
    [ProgressBarTypes.primary]: theme.palette.primary.main,
    [ProgressBarTypes.secondary]: theme.palette.secondary.main,
    [ProgressBarTypes.info]: theme.palette.info.main
  }

  // Starting values needed for the animation
  // Mapped by "visualParts" so it can work with multiple values dynamically
  // It's an array of percentage widths
  const [widths, setWidths] = useState(
    parts.map(() => {
      return 0
    })
  )

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        parts.map(item => {
          return item.percent
        })
      )
    })
  }, [parts]);

  return (
    <>
      <ProgressBarFull>
        {parts.map((item, index) => {

          return (
              <ProgressBarInner
                bgColor={colorMap[item.color]}
                // There won't be additional changes in the array so the index can be used
                key={index}
                style={{
                  width: `${widths[index]}%`,
                }}
                className="progressVisualPart"
              />
          )
        })}
      </ProgressBarFull>
    </>
  );
}