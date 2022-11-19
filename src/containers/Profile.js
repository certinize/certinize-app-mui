import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Image from 'mui-image';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from "../components/ResponsiveAppBar";




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    borderRadius: 10,
    color: theme.palette.text.secondary,
  }));

const Profile = () => {
  return (
    
      <>
            <ResponsiveAppBar />
        <div style={{ display: 'flex',   padding: 20, alignItems: 'center' , "@media (max-width: 768px)": {    flexDirection: "column"        
              }}}>
            <div>
                <div>
                    <Image duration = {0} height = {290} width = {290} sx={{marginTop: 10, marginLeft: 20}} src="../images/profile.png" />
                </div>
                <div>
                    <Typography sx={{ fontSize: 15, marginTop: 10, marginLeft: 25}}>
                    We are verifying your profile...     
                    </Typography>
                </div>
            </div>
            <div>
            <Box sx={{ width: 450,  marginLeft: 35, }}>
            <Stack spacing={6}>
                <div>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 15}}>
                        Wallet Address 
                    </Typography>
                    <Item>Wallet Address</Item>
                </div>
                <div>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 15}}>
                        Official Email
                    </Typography>
                    <Item>Official Email</Item>
                </div>
                <div>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 15}}>
                        Official Website
                    </Typography>
                    <Item>Official Website</Item>
                </div> 
            </Stack>
            </Box>
            </div>  
        </div>
      </>
  );
}
export default Profile;

