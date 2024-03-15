import {Box, styled, Typography} from "@mui/material";

export const XpNumberTypography = styled(Typography)<{fontColor?: string}>(({theme, fontColor}) => ({
  color: fontColor || theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 600,
  lineHeight: '2rem',
  padding: 0,
}))

export const PercentTypography = styled(Typography)<{fontColor?: string}>(({theme, fontColor}) => ({
  color: fontColor || theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 600,
  lineHeight: '2rem',
  padding: 0,
}))

export const StatTypography = styled(Typography)(({theme}) => ({
  color: theme.palette.grey[200],
  fontSize: "1rem",
  fontWeight: 500,
  lineHeight: '2rem',
  padding: 0,
}))

export const TitleTypography = styled(Typography)(({theme}) => ({
  color: theme.palette.grey[200],
  fontSize: "1.2rem",
  fontWeight: 500,
  lineHeight: '2.5rem',
  padding: 0,
}))


export const ProgressBarInner = styled(Box)<{ bgColor: string }>(({theme, bgColor}) => ({
  backgroundColor: bgColor,
  boxShadow: bgColor !== theme.palette.primary.main ? `0 0 5px ${bgColor}` : 'none',
  transition: 'width 0.5s',
  '&:first-of-type': {
    borderBottomLeftRadius: '5px',
    borderTopLeftRadius: '5px'
  },
  '&:last-of-type': {
    borderBottomRightRadius: '5px',
    borderTopRightRadius: '5px'
  }
}))

export const ProgressBarFull = styled(Box)(({theme}) => ({
  display: 'flex',
  width: '100%',
  height: '12px',
  margin: '20px 0',
  borderRadius: '5px',
  backgroundColor: theme.palette.grey[600]
}))