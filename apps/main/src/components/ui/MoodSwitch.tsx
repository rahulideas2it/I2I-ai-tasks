import { Switch, styled, Box } from '@mui/material'

interface MoodSwitchProps {
  checked: boolean
  onChange: () => void
}

const CustomSwitch = styled(Switch)(() => ({
  width: 48,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 1,
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& .MuiSwitch-thumb:before': {
        content: "'😈'",
      },
      '& + .MuiSwitch-track': {
        backgroundColor: '#d32f2f',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    '&:before': {
      content: "'😊'",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 13,
    backgroundColor: '#1976d2',
    opacity: 1,
  },
}))

export const MoodSwitch = ({ checked, onChange }: MoodSwitchProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <CustomSwitch
      checked={checked}
      onChange={onChange}
      title={checked ? 'Switch to Good Mode' : 'Switch to Evil Mode'}
    />
  </Box>
)