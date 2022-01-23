import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Paper, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom';



export default function PreviewCode(props) {
  const [detaildata, setDetaildata] = useState([]);
  const id = props.InfoId;

  const [isdata, setIsdata] = useState(false)


  const { menuitem } = useSelector(state => state.dashboardReducer);
  console.log(menuitem);

  useEffect(() => {
    if (menuitem) {


      axios.get(`http://127.0.0.1:8000/api/detail/${menuitem || null}`).then(
        (res) => {
          console.log(res);
          setDetaildata(res.data);
          setIsdata(true)
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [menuitem]);


  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8000/api/detail/${1}`).then(
  //     (res) => {
  //       console.log(res);
  //       setDetaildata(res.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  // }, []);



  var data = null;
  if (detaildata.length > 0) {
    data = <>
    <Box py={1}>
          <Typography gutterBottom variant="h4" component="h2" style={{textAlign:'center'}}>
              Detail View
          </Typography>

          <Typography gutterBottom variant="h7" component="h2" style={{textAlign:'right'}}>
          <Link
            to={{
              pathname: "/edit",
              data: detaildata // your data array of objects
            }}
          >Edit</Link>
          </Typography>
        
       </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="h2">
            Object Type
          </Typography>
          {/* <Typography component="h2"> */}
          <div style={{ paddingLeft: 30 }}>
            {detaildata[0].Object_Type.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })
            }
            {/* </Typography> */}
          </div>

        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="h2">
            Feature Name
          </Typography>
          {/* <Typography component="h2"> */}
          <div style={{ paddingLeft: 30 }}>
            {detaildata[0].Feature_Name.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })
            }
            {/* </Typography> */}
          </div>

        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="h2">
            Level
          </Typography>
          {/* <Typography component="h2"> */}
          <div style={{ paddingLeft: 30 }}>
            {detaildata[0].Level.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })
            }
            {/* </Typography> */}
          </div>

        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="h2">
            Seq No
          </Typography>
          {/* <Typography component="h2"> */}
          <div style={{ paddingLeft: 30 }}>
            {detaildata[0].Sequence_Number}
          </div>

        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Source Feature Description
          </Typography>
          {/* <Typography component="h2"> */}
          <div style={{ paddingLeft: 30 }}>
            {detaildata[0].Source_FeatureDescription.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })
            }
            {/* </Typography> */}
          </div>

        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Source Code
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}>
              {/* <Typography component="h2"> */}
              {detaildata[0].Source_Code.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })
              }
            </Card>
          </div>
          {/* </Typography> */}

        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Target Feature Description
          </Typography>
          {/* <Typography component="h2"> */}
          <div style={{ paddingLeft: 30 }}>
            {detaildata[0].Target_FeatureDescription.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })
            }
            {/* </Typography> */}
          </div>

        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Target Actual Code
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}>
              {/* <Typography component="h2"> */}
              {detaildata[0].Target_ActualCode.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })
              }
            </Card>
          </div>
          {/* </Typography> */}

        </Grid>


        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Target Expected Code
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}>
              {/* <Typography component="h2"> */}
              {detaildata[0].Target_Expected_Output.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })
              }
            </Card>
          </div>
          {/* </Typography> */}

        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Conversion Description
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            {/* <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}> */}
            {detaildata[0].Conversion_Description.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })
            }
            {/* </Card> */}

          </div>
          {/* </Typography> */}

        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Conversion Module
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}>
              {/* <Typography component="h2"> */}
              {detaildata[0].Conversion_Code.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })
              }
            </Card>
          </div>
          {/* </Typography> */}

        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Source Attachments
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}>
              {/* <Typography component="h2"> */}
              {detaildata[0].upload_files.Source_Attachment}
            </Card>
          </div>
          {/* </Typography> */}

        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Target Attachments
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}>
              {/* <Typography component="h2"> */}
              {detaildata[0].upload_files.Target_Attachment}
            </Card>
          </div>
          {/* </Typography> */}

        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            Conversion Attachments
          </Typography>
          <div style={{ paddingLeft: 30 }}>
            <Card style={{ paddingLeft: 30, backgroundColor: "black", color: "white" }}>
              {/* <Typography component="h2"> */}
              {detaildata[0].upload_files.Conversion_Attachment}
            </Card>
          </div>
          {/* </Typography> */}

        </Grid>




      </Grid>
      <Box py={2}>
        <div style={{textAlign:'center'}}>
        <Button variant="outlined" color="primary" endIcon={<EditIcon/>}
        // onClick={}
        >
        Edit
      </Button>
      </div>
       </Box>

      

    </>
  }


  return (
    // <>
    //   <Box py={4}>
    //     <Grid container direction='row' justifyContent='center'>
    //       <Grid item>
    //         <Typography variant='h6'>
    //           Detail View
    //         </Typography>
    //       </Grid>

    //     </Grid>
    //   </Box>

    //   <form autoComplete="off">
    //     <Grid container direction="row" xs={12} spacing={4}>

    //       {detaildata.map((item, ind) => {
    //         return (
    //           <>
    //             {Object.keys(item).map((list) => {
    //               return (
    //                 <Grid item xs={6}>
    //                   <TextField
    //                     id="outlined-multiline-static"
    //                     label="Feature Name"
    //                     multiline
    //                     InputProps={{ disableUnderline: true }}
    //                     label={list}
    //                     rows={
    //                       list === "Source_Code" ||
    //                         list === "Target_ActualCode" ||
    //                         list === "Target_Expected_Output" ||
    //                         list === "Conversion_Code" || list === "Conversion_Description" || list === "Target_FeatureDescription"

    //                         ? 10
    //                         : 1
    //                     }
    //                     //   rows={1}
    //                     value={item[list]}
    //                     // defaultValue="Default Value"
    //                     // onChange={handleFeaturename}
    //                     variant="outlined"
    //                     required
    //                     fullWidth
    //                     disabled
    //                   />
    //                 </Grid>
    //               );
    //             })}
    //           </>
    //         );
    //       })}
    //     </Grid>
    //   </form>
    // </>
    <div>
        
      {data}
      
    </div>

  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
// import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
// import { useSelector } from "react-redux";

// export default function PreviewCode(props) {
//   const [detaildata, setDetaildata] = useState([]);
//   const id = props.InfoId;

//   const [edit,setedit]=useState(false)

//   const { menuitem } = useSelector(state => state.dashboardReducer);
//   console.log(menuitem);

//   useEffect(() => {
//      if(menuitem)
//      {

     
//     axios.get(`http://127.0.0.1:8000/api/detail/${menuitem||1}`).then(
//       (res) => {
//         console.log(res);
//         setDetaildata(res.data);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//      }
//   }, [menuitem]);
//   useEffect(() => {
   

    
//    axios.get(`http://127.0.0.1:8000/api/detail/${1}`).then(
//      (res) => {
//        console.log(res);
//        setDetaildata(res.data);
//      },
//      (error) => {
//        console.log(error);
//      }
//    );
    
//  }, []);
 



  

//   return (
//       <>
//       {detaildata.length>0&&
//       <>
//     <Box py={4}>
//             <Grid container direction='row' justifyContent='center'>
//                 <Grid item>
//                     <Typography variant='h6'>
//                         Detail View
//                     </Typography>
//                 </Grid>

//             </Grid>
//             </Box>

//     <form autoComplete="off">
//       <Grid container direction="row" xs={12} spacing={4}>
//         {detaildata.map((item, ind) => {
//           return (
//             <>
//               {Object.keys(item).map((list) => {
//                 return (
//                   <Grid item xs={6}>
//                     <TextField
                    
//                       label="Feature Name"
//                       multiline
//                       InputProps={{
                      
//                         disableUnderline: !edit, // <== added this
//                       }}
//                       label={list}
//                       rows={
//                         list ==="Source_Code" ||
//                         list ==="Target_ActualCode" ||
//                         list ==="Target_Expected_Output" ||
//                         list ==="Conversion_Code"||list==="Conversion_Description "||list==="Target_FeatureDescription"||list==="Source_FeatureDescription "
                        
//                           ? 10
//                           : 1
//                       }
//                     //   rows={1}
//                       value={item[list]}
//                       // defaultValue="Default Value"
//                       // onChange={handleFeaturename}
//                       variant={ !edit? "standard":"outlined" }// <== changed this
//                       required
//                       fullWidth
//                       disabled
//                     />
//                   </Grid>
//                 );
//               })}
//             </>
//           );
//         })}
//       </Grid>


//       <Box py={5}>

// <Grid container direction='row ' justifyContent='center' spacing={2}>

//     <Grid item>
//         <Button
//             // type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             // className={classes.submit}
//             onClick={()=>setedit(!edit)}

//         >
//             Edit
//         </Button>
//     </Grid>
//     <Grid item>
//         <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             // className={classes.submit}
//             // onClick={handleSubmit}

//         >
//             Submit
//         </Button>
//     </Grid>
// </Grid>
// </Box>
//     </form>
    
//     </>}
//     </>
//   );
// }
