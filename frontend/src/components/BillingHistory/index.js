import React, { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { 
Grid, 
Table, 
TableBody, 
TableCell, 
TableContainer, 
TableHead, 
TableRow, 
TablePagination,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function BillingHistory() {


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [billing, setBilling] = useState([]);
  const [filteredBilling, setFilteredBilling] = useState([]);
 

 



  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://mcms_api.mtron.me/get_billing");
      const data = await response.json();
      setRows(data);
    }
    fetchData();
  },[]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setConfirmDialogOpen(true);
  };
  const handleConfirmDelete = async () => {
    try{
      await fetch(`https://mcms_api.mtron.me/delete_billing/${itemToDelete}`, {
        method: "GET",
      });
      setBilling(billing.filter((item) => item.app_id !== itemToDelete));
      setFilteredBilling(
        filteredBilling.filter((item) => item.app_id !== itemToDelete)
      );
    setItemToDelete(null);
    setConfirmDialogOpen(false);
    toast.success('Appointment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setConfirmDialogOpen(false);
  };


  return (
    <Box
    sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
        width: '100%',
        backgroundColor:'#DA70D6',
        height: 670,        
      },
    }}
  >
    <Paper variant="outlined" >
      <Grid container spacing={1} sx={{paddingTop:'20px', paddingLeft:'50px'}}>
      <Grid item xs={6}>
        <Item><h4 style={{fontWeight:'bold'}}>DOCTOR CHARGES DETALS</h4>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Invoice Id</TableCell>
                  <TableCell>Appointment No.</TableCell>
                  <TableCell>Selected Doctor</TableCell>
                  <TableCell>Doctor Charge</TableCell>
                  <TableCell>
                  <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.length > 0 ? (
                  rows
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((item) => (
                    <TableRow hover key={item.inv_id}>
                    <TableCell>{item.inv_id}</TableCell>
                    <TableCell>{item.inv_date}</TableCell>
                    <TableCell>{item.app_num}</TableCell>
                    <TableCell>{item.selected_doctor}</TableCell>
                    <TableCell>{item.doctor_charge}</TableCell>
                    <TableCell>
                        <IconButton
                          variant="outlined"
                          size="small"
                          onClick={() => handleDelete(item.list_id)}
                        >
                        <DeleteIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>)))
                    :
                    (<TableRow>
                      <TableCell colSpan={5}>No data available</TableCell>
                    </TableRow>
                  )}

              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item><h4 style={{fontWeight:'bold'}}>BILLING ITEMS DETALS</h4>
        <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>List ID</TableCell>
                  <TableCell>Drug Id</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>
                  <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.length > 0 ? (
                  rows
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((item) => (
                    <TableRow hover key={item.list_id}>
                    <TableCell>{item.list_id}</TableCell>
                    <TableCell>{item.drug_id}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit_price}</TableCell>
                    <TableCell>{item.total_amount}</TableCell>
                    <TableCell>
                        <IconButton
                          variant="outlined"
                          size="small"
                          onClick={() => handleDelete(item.list_id)}
                        >
                        <DeleteIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>)))
                    :
                    (<TableRow>
                      <TableCell colSpan={5}>No data available</TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          {itemToDelete && (
            <Dialog
              open={confirmDialogOpen}
              onClose={handleCancelDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
              </DialogTitle>
              <DialogContent>
                <div id="alert-dialog-description">
                  Are you sure you want to delete this item?
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus>Delete</Button>
              </DialogActions>
            </Dialog>)}
        </Item>
      </Grid>
      <Grid item xs={12}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
      </Grid>
    </Paper>
  </Box>
  )
}
