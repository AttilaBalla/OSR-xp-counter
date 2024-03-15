import {XpNumberTypography} from "./styledElements";

interface IProps {
  xp: number
  fontColor?: string
}
export function ExperienceNumber({xp, fontColor}: IProps) {

  const formatted = xp.toLocaleString('en-us')

  return (
    <XpNumberTypography fontColor={fontColor}>{formatted}</XpNumberTypography>
  )
}