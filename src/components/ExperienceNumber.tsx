import {XpNumberTypography} from "./styledElements";

interface IProps {
  xp: number
}
export function ExperienceNumber({xp}: IProps) {

  const formatted = xp.toLocaleString('en-us')

  return (
    <XpNumberTypography>{formatted}</XpNumberTypography>
  )
}