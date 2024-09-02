import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box component='div' sx={{ flexGrow: 1 }}>
      <AppBar position='relative' aria-label='Header navigation'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link href='/' variant='body1'>
              Courses Info Portal
            </Link>
          </Typography>

          <Button
            href='/contact-info'
            sx={{
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'lightgray',
              },
            }}
            variant='outlined'>
            Contact Info
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
