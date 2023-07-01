import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Grid,
     Box, 
     Typography,
     Divider,
     TextField,
     Radio,
     FormControlLabel,
     RadioGroup,
     Button,
     Modal,
     style,

    } from '@mui/material';

function AddAppointment2() {

    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState("");
    const [mobile, setMobile] = useState("");
    const [area, setArea] = useState("");

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

 
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', height: 175, backgroundColor: '#ce93d8' }}>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px', textAlign: 'left', paddingLeft: '90px' }}>
            BOOK A CHANNEL
          </Typography>
          <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '1200px', height: 100, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={0}>
            <Grid item xs={3.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Doctor Name
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                NISHANTHA GUNASEKARA
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Date
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                2022-06-28
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={3}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Time
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                04.00 PM TO 08.00 PM
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem color />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Channeling Free
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'purple', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                LKR 4,500.00
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '1200px', height: 400, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={1}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
          <TextField
            id="patient-name"
            label="Patient Name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            variant="outlined"
            color="secondary"
            sx={{ width: '90%' , marginBottom: '20px'}}
          />
            </Grid>
          <Grid item xs={12} sm={12} container spacing={8} >
          <Grid item xs={6}  sx={{ display: 'flex', justifyContent: 'right' }}>
            <TextField
             id="age"
             label="Patient Age"
             value={age}
             onChange={(event) => setAge(event.target.value)}
             variant="outlined"
             color="secondary"
             sx={{ width: '90%' , marginBottom: '10px'}}
           /> 
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left' }} >
            <TextField 
             id="mobile"
             label="Patient Mobile"
             value={mobile}
             onChange={(event) => setMobile(event.target.value)}
             variant="outlined"
             color="secondary"
             sx={{ width: '90%' , marginBottom: '10px'}}
           />
          </Grid>
          </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}  >
            <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ width: '90%',marginBottom: '10px' }}

      >
        <FormControlLabel value="female" control={<Radio />} label="Female"  sx={{ marginRight: '100px' }}/>
        <FormControlLabel value="male" control={<Radio />} label="Male"  />
      </RadioGroup>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
          <TextField
            id="area"
            label=" Patient Area"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            variant="outlined"
            color="secondary"
            sx={{ width: '90%' , marginBottom: '20px'}}
          />
            </Grid>
            <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center'}} >
            <Button variant="contained" size="medium" color="secondary" sx={{ width: '1075px', height: '50px',fontSize: '24px' }} onClick={handleOpen}Open modal>Book Now</Button>
            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="Patient Information Title"
                  aria-describedby="Patient Information Description "
                >
                  <Box sx={style}>
                    <Typography id="Patient Information Title" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold',fontSize: '24px'}}>
                    Patient Information Title
                    </Typography>
                    <Typography id="Patient Information Description" sx={{ mt: 2 }}>
                      NAME: 
                    </Typography>
                    <Typography id="Patient Information Description" sx={{ mt: 2 }}>
                      AGE:
                    </Typography>
                    <Typography id="Patient Information Description" sx={{ mt: 2 }}>
                      MOBILE:
                    </Typography>
                    <Typography id="Patient Information Description" sx={{ mt: 2 }}>
                      GENDER:
                    </Typography>
                    <Typography id="Successfull Message" sx={{ mt: 2 ,color: '#9c27b0', fontWeight: 'bold',fontSize: '20px',textAlign: 'center'}}  >
                      SUCCESSFULLY!!!
                    </Typography>
                  </Box>
                </Modal>
              </Grid> 
          </Grid>
        </Box>
    </Grid>
     </Grid>
  );
}

export default AddAppointment2;
  
