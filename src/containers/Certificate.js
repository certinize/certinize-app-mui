import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Certificate() {
  const inputRef = React.useRef();
  const [templateFile, setTemplateFile] = React.useState(null);
  return (
    <>

    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#F9F9F9', height: '150%', borderRadius: 3, boxShadow: '1px 2px 2px 2px #888888 ' , marginTop: 5}} >
          <div>
            <Typography variant="h5" sx={{ marginLeft: 19, fontWeight: 'bold', textAlign:'justify' , alignItems: 'center', padding: 4, color: '#1A799D'}}>
            Get verified!
            </Typography>

            <Typography variant="subtitle2" sx={{ textAlign:'justify', marginLeft: 3, marginTop: -3, width: '90%'}}>
           <b>  With Certinize, people do not have to verify certificates. They only need to validate the issuing body, your organization.</b> It means to find out if a wallet address   used to issue a certificate belongs to an organization.
            </Typography>
          </div>
          <div>
            <Typography variant="body2" sx={{ color: '#1A799D', fontWeight: 'bold', padding: 2, marginTop: 2}} >
              1. Private Key
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 3, width: '55ch', marginTop: -1},
              }}
              noValidate
              autoComplete="off"
            >    
              <TextField label="Enter Private Key" variant="outlined" />
            </Box>
          </div>
          <div>
            <Typography variant="body2" sx={{ color: '#1A799D', fontWeight: 'bold', padding: 2, marginTop: -2 }} >
            2. Verification Link
            </Typography>

            <Typography variant="subtitle2" sx={{ marginLeft: 3}}>
              Any of the three:
            </Typography>

            <Typography  variant="subtitle2" sx={{width: '94%'}}>
              <ul>
                <li><b style = {{color: '#1A799D'}}>Google Trends:</b> A profile on Google Trends with evidence of recent search activity about you.</li>
                <li><b style = {{color: '#1A799D'}}>Wikipedia article:</b> A Wikipedia article that is about  you and meets their notability standards for people.</li>
                <li><b style = {{color: '#1A799D'}}>Public stock exchange:</b> A link providing evidence of substantial presence in a public stock exchange.    </li>
              </ul>
            </Typography>
            
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 3, width: '55ch'},
              }}
              noValidate
              autoComplete="off"
            >    
              <TextField label="Enter Verification Key"  variant="outlined" inputProps={{style:{ color: 'white'}}} />
            </Box>
          </div>
          <div>
            <Typography variant="body2" sx={{ color: '#1A799D', fontWeight: 'bold', padding: 2 }} >
              3. Official Website
            </Typography>

            <Typography variant="subtitle2" sx={{ marginLeft: 3,  width:'90%'}}>
            Provide the link to an  official website that refences your organization and your wallet address
            </Typography>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 3, width: '55ch'},
              }}
              noValidate
              autoComplete="off"
            >    
              <TextField label="Enter Official Website" variant="outlined" />
            </Box>
          </div>
          <div>
            <Typography  variant="body2" sx={{ color: '#1A799D', fontWeight: 'bold', padding: 2 }} >
              4. Official Email Address
            </Typography>

            <Typography variant="subtitle2" sx={{ marginLeft: 3,  width:'90%'}}>
            Provide an official email address with a domain relevant to the notability category you choose. 
            </Typography>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 3, width: '55ch'},
              }}
              noValidate
              autoComplete="off"
            >    
              <TextField label="Enter Official Email Address" variant="outlined" />
            </Box>
          </div>
          <div>
            <Typography variant="body2" sx={{ color: '#1A799D', fontWeight: 'bold', padding: 2 }} >
              5. Organization ID
            </Typography>
            <div>
            <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              "@media (max-width: 768px)": {
                flexDirection: "column",
              },
            }}
            />
            <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              "@media (max-width: 768px)": {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                height: 35,
                width: 470,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 3,
                boxShadow: "0 0.125rem 0.125rem 0 rgba(0,0,0,0.5);",
                borderRadius: 2,
              }}
              onClick={() => inputRef.current.click()}
            >
              <Box
                sx={{
                  height: "100%",
                  width: 120,
                  minWidth: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#D9D9D9",
                  padding: "0 0.625rem",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  "&:hover": {
                    backgroundColor: "#c3c3c3",
                    cursor: "pointer",
                  },
                }}
              >
                 <b style={{fontSize:12}}>Choose file</b>
              </Box>
              <Box
                sx={{
                  width: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 0.625rem",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {templateFile?.name}
                </span>
              </Box>

              <input
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  setTemplateFile(e.target.files[0]);
                }}
                ref={inputRef}
              />
            </Box>
            </Box>
            </div>
            <div style = {{padding: 20}}>
            <Stack spacing={2} direction="row">
              <Button  variant="contained" sx={{width: 75, height: 30, backgroundColor:'#A6A0A0', color: 'white', marginLeft: 40}}>Cancel</Button>
              <Button  variant="contained"  sx={{width: 75, height: 30, backgroundColor:'#1D9DC6', color: 'white'}}>Submit</Button>
            </Stack>
            </div>
          </div> 
        </Box>
      </Container>
    </React.Fragment>
    </>
  
  );
}
