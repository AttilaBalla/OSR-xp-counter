import {useEffect, useState} from "react";
import "./ProgressLine.css";
import {ProgressBarFull, ProgressBarPrimary, ProgressBarSecondary} from "./styledElements";
import {progressBarTypes} from "../utilities/constants";

interface IProps {
  parts: { percent: number, color: string }[]
}

export function MultiPartProgress(props: IProps) {

  const {parts} = props;

  // Starting values needed for the animation
  // Mapped by "visualParts" so it can work with multiple values dynamically
  // It's an array of percentage widths
  const [widths, setWidths] = useState(
    parts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        parts.map(item => {
          return item.percent;
        })
      );
    });
  }, [parts]);

  return (
    <>
      <ProgressBarFull>
        {parts.map((item, index) => {
          // map each part into separate div and each will be animated
          // because of the "transition: width 2s;" css in class "progressVisualPart"
          // and because of the new width ("widths[index]", previous one was 0)
          return (
            item.color === progressBarTypes.primary ?
              <ProgressBarPrimary
                // There won't be additional changes in the array so the index can be used
                key={index}
                style={{
                  width: `${widths[index]}%`,
                }}
                className="progressVisualPart"
              /> :
              <ProgressBarSecondary
                key={index}
                style={{
                  width: `${widths[index]}%`,
                }}
                className="progressVisualPart"
              />
          );
        })}
      </ProgressBarFull>
    </>
  );
}