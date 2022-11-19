/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react'
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';



export default function Landing() {
  return (
    <>
     
   <div style={{ display: 'flex', padding: 10, textAlign:'justify' }}>
      <div>
        <Typography sx={{ display: 'flex', marginLeft: 10, fontSize: 40, fontWeight: 'bold',  marginTop: 10}}>
          Turn your certificate into success 
        </Typography>
        <Typography sx={{ display: 'flex', marginLeft: 10, fontSize: 20}}>
        Certificates are part of a personal information which verifies that the holder has completed academic requirements.
        </Typography>
        <Tooltip> 
          <Button sx={{marginLeft: 30, backgroundColor: '#FF9494', marginTop: 15, height: 55, fontWeight: 'bold', width: 195}} variant="contained" disableElevation>
            Get Started
          </Button>
        </Tooltip>
    </div>
      <div>
        <Image duration = {0} height = {490} width = {510} sx ={{marginTop: 10 }}src="../images/landing1.png" />
      </div>
   </div>
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} minHeight={350} backgroundColor="#FFE3E1" marginTop={15}>
        <Grid xs display="flex" justifyContent="center" alignItems="center" >
          <div style = {{backgroundColor: 'white', height: 140, width: 140, borderRadius: 100, boxShadow: '2px 2px 4px #888888 '}}>
            <img style={{height: 70, width: 70, marginTop: 33, marginLeft: 37}} src="../images/certificate.png" />
            <p style={{ marginTop: 60, fontWeight: 'bold', fontSize: 20, marginLeft: 18 }}>Certificate</p>
          </div> 
        </Grid>
        <Grid display="flex" justifyContent="center" alignItems="center">
          <div style = {{backgroundColor: 'white', height: 140, width: 140, borderRadius: 100, boxShadow: '2px 2px 4px #888888 '}}>
            <img style={{height: 70, width: 70,  marginTop: 33, marginLeft: 37}} src="../images/blockchain.png" />
            <p style={{ marginTop: 60, fontWeight: 'bold', fontSize: 20, marginLeft: 18 }}>Blockchain</p>
          </div>
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <div style = {{backgroundColor: 'white', height: 140, width: 140, borderRadius: 100, boxShadow: '2px 2px 4px #888888 '}}>
            <img style={{height: 70, width: 70,  marginTop: 33, marginLeft: 37}} src="../images/distributed.png" />
            <p style={{ marginTop: 60, fontWeight: 'bold', fontSize: 20, marginLeft: 30 }}>Issuance</p>
          </div>
        </Grid>
      </Grid>
    </Box>
    </>
  
  );
}
