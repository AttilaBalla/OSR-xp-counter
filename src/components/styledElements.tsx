import {Box, styled, Typography} from "@mui/material";

export const XpNumberTypography = styled(Typography)(() => ({
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


export const ProgressBarPrimary = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.primary.main
}))

export const ProgressBarSecondary = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.secondary.main
}))

export const ProgressBarFull = styled(Box)(({theme}) => ({
  display: 'flex',
  width: '100%',
  height: '12px',
  margin: '20px 0',
  borderRadius: '5px',
  backgroundColor: theme.palette.grey[600]
}))