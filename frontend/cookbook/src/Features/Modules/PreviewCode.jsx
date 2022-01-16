import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Paper, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function PreviewCode(props) {
  const [detaildata, setDetaildata] = useState([]);
  const id = props.InfoId;


  const { menuitem } = useSelector(state => state.dashboardReducer);
  console.log(menuitem);

  useEffect(() => {
     if(menuitem)
     {

     
    axios.get(`http://127.0.0.1:8000/api/detail/${menuitem||1}`).then(
      (res) => {
        console.log(res);
        setDetaildata(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
     }
  }, [menuitem]);
  useEffect(() => {
   

    
   axios.get(`http://127.0.0.1:8000/api/detail/${1}`).then(
     (res) => {
       console.log(res);
       setDetaildata(res.data);
     },
     (error) => {
       console.log(error);
     }
   );
    
 }, []);
 



  

  return (
      <>
    <Box py={4}>
            <Grid container direction='row' justifyContent='center'>
                <Grid item>
                    <Typography variant='h6'>
                        Detail View
                    </Typography>
                </Grid>

            </Grid>
            </Box>

    <form autoComplete="off">
      <Grid container direction="row" xs={12} spacing={4}>
     
        {detaildata.map((item, ind) => {
          return (
            <>
              {Object.keys(item).map((list) => {
                return (
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Feature Name"
                      multiline
                      InputProps={{ disableUnderline: true}}
                      label={list}
                      rows={
                        list ==="Source_Code" ||
                        list ==="Target_ActualCode" ||
                        list ==="Target_Expected_Output" ||
                        list ==="Conversion_Code"||list==="Conversion_Description "||list==="Target_FeatureDescription"
                        
                          ? 10
                          : 1
                      }
                    //   rows={1}
                      value={item[list]}
                      // defaultValue="Default Value"
                      // onChange={handleFeaturename}
                      variant="outlined"
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                );
              })}
            </>
          );
        })}
      </Grid>
    </form>
    </>
  );
}
