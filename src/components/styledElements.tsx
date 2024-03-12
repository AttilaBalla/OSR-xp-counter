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
  backgroundColor: theme.palette.primary.main,
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

export const ProgressBarSecondary = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.secondary.main,
  transition: 'width 0.5s',
  boxShadow: `0 0 5px ${theme.palette.secondary.main}`,
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