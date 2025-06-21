import { Button as MuiButton, ButtonProps } from '@mui/material'

interface CustomButtonProps extends ButtonProps {
  isEvil?: boolean
}

export const Button = ({ children, isEvil, ...props }: CustomButtonProps) => (
  <MuiButton 
    variant="contained"
    sx={{ 
      fontSize: '1rem',
      px: 3,
      py: 1,
      borderRadius: 2,
      textTransform: 'capitalize',
      ...props.sx
    }}
    {...props}
  >
    {children}
  </MuiButton>
)