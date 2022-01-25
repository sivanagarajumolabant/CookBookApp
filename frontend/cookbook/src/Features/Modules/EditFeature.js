import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import CreatePreview from './CreatePreview';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuAppBar from '../../Components/header'
import { Box, Grid, Typography } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    rootc: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function EditFeature(props) {
    console.log(props.location.data)
    const editdata = props.location.data
    // console.log("editdata", editdata.detaildata[0].Migration_TypeId)
    const classes = useStyles();

    const [formValues, setformvalues] = useState({ Migration_TypeId: props.location.state?.data?.type, Object_Type: props.location.state?.data?.Label })
    const [file, setfile] = useState([])
    // const [AttachmentList, setAttachmentList] = useState({})
    const { headerValue } = useSelector(state => state.dashboardReducer);
    const [source_att, setSourceatt] = useState([])
    const [target_att, setTargetatt] = useState([])
    const [conver_att, setConveratt] = useState([])
    // const [migtypeid,setMigtypeid] = useState()
    const [Source_FeatureDescription , setSource_FeatureDescription] = useState("");
    const [Target_FeatureDescription , setTarget_FeatureDescription] = useState("");
    const [Source_Code , setSource_Code] = useState("");
    const [Target_ActualCode , setTarget_ActualCode] = useState("");
    const [Target_Expected_Output , setTarget_Expected_Output] = useState("");
    const [Conversion_Code , setConversion_Code] = useState("");
    
    
    
    useEffect((e)=> {
        setSource_FeatureDescription(  editdata.detaildata[0].Source_FeatureDescription )
        setTarget_FeatureDescription(  editdata.detaildata[0].Target_FeatureDescription )
        setSource_Code(  editdata.detaildata[0].Source_Code )
        setTarget_ActualCode(  editdata.detaildata[0].Target_ActualCode )
        setTarget_Expected_Output(  editdata.detaildata[0].Target_Expected_Output )
        setConversion_Code(  editdata.detaildata[0].Conversion_Code )

    }, [editdata]);

    // useEffect(() => {
    //     if (editdata) {
    //         axios.put(`http://127.0.0.1:8000/api/update/${editdata.detaildata[0].Feature_Id}`, formData)
    //         .then(res => {
    //             setDetaildata(res.data
    //                 );
    //             console.log(res.data)
    //         }, error => {
    //             console.log(error);
    //         })
       
    //     }
    //   }, [editdata]);


   

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            ...formValues,
            Migration_TypeId: editdata[0].Migration_TypeId,
            Object_Type: editdata[0].Object_Type,
            Feature_Name:editdata[0].Feature_Name,
            Source_FeatureDescription,Target_FeatureDescription,
            'Source_Attachment': null,
            "Conversion_Attachment": null,
            "Target_Attachment": null
            
        }
        axios.put(`http://127.0.0.1:8000/api/update/${editdata.detaildata[0].Feature_Id}`, formData)
            .then(res => {
                console.log(res.data)
            }, error => {
                console.log(error);
            })

    }

    const handleChange = (e) => {
        setformvalues({
            ...editdata,
            [e.target.name]: [e.target.value],
        })
    }


    // const handlechangedropdownlevel = (v) => {
    //     setformvalues({
    //         ...formValues,
    //         "Level": v.title
    //     })


    // }
    // const handlechangedropdown = (v) => {
    //     setformvalues({
    //         ...formValues,
    //         "Migration_TypeId": v.title
    //     })


    // }
    // const handlechangedropdownobj = (v) => {
    //     setformvalues({
    //         ...formValues,
    //         "Object_Type": v.code
    //     })


    // }

    const onchangefile_source = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push({
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
                if (filesystem.length>0){
                    setSourceatt(filesystem[0].name);
                }else{
                    setSourceatt()
                }
                
            }
            // console.log(filesystem)
        }
    }


    const onchangefile_target = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push({
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
                if (filesystem.length>0){
                    setTargetatt(filesystem[0].name);
                }else{
                    setSourceatt()
                }
            }
            // console.log(filesystem)
        }
    }
    const onchangefile_conver = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push({
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
                if (filesystem.length>0){
                    setConveratt(filesystem[0].name);
                }else{
                    setSourceatt(null)
                }
            }
            // console.log(filesystem)
        }
    }





    const handledetale_source = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setSourceatt(data)

    }
    const handledetale_target = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setTargetatt(data)

    }
    const handledetale_conv = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setConveratt(data)

    }

    // const onchangefile = (e, value) => {

    //     const { files } = e.target;
    //     if (files.length > 0) {
    //         const filesystem = [...file];
    //         for (let i = 0; i < files.length; i++) {

    //             const file = files[i];

    //             filesystem.push({
    //                 name: file.name,
    //                 size: file.size,
    //                 type: file.type
    //             });
    //             setfile(filesystem);


    //             setAttachmentList({
    //                 ...AttachmentList,
    //                 [value]: filesystem[0].name
    //             })

    //             // setUploadingDoc(false);


    //         }
    //         console.log(filesystem)
    //     }



    //     // setformvalues({
    //     //     ...formValues,
    //     //  files:[
    //     //      ...file,
    //     //      e.target.files[0]
    //     //  ]
    //     // })

    // }

    const handlechangedropdownlevel = (v) => {
        setformvalues({
            ...formValues,
            "Level": v.title
        })
    }

    if (editdata.detaildata[0]) {
        if (editdata.detaildata[0].Migration_TypeId === '1') {
            editdata.detaildata[0].Migration_TypeId = 'Oracle To Postgres'
            // setMigtypeid(1)
        }
        else if (editdata.detaildata[0].Migration_TypeId === '2') {
            editdata.detaildata[0].Migration_TypeId = 'Oracle TO SQLServer'
            // setMigtypeid(2)
        }
        else if (editdata.detaildata[0].Migration_TypeId === '3') {
            editdata.detaildata[0].Migration_TypeId = 'Oracle To MYSQL'
            // setMigtypeid(3)
        }
    }


    const handledetale = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setfile(data)

    }

    const handleConvert = (e)=>{
        e.preventDefault();
    }


    // console.log(props.location.state)

    // console.log(AttachmentList)
    return (

        <MenuAppBar>
            <Box py={4}>
                <Grid container direction='row' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h6'>
                            Edit Feature
                        </Typography>
                    </Grid>

                </Grid>
            </Box>

            <form autoComplete="off">
                <Grid container direction='row' xs={12} spacing={4}>

                    <Grid item xs={6}>

                        <TextField
                            id="outlined-multiline-static"
                            label="Migration Type"
                            multiline
                            rows={1}
                            onChange={(e) => handleChange(e)}
                            label="Migration Type"
                            // defaultValue="Default Value"
                            value={editdata.detaildata[0].Migration_TypeId}
                            variant="outlined"
                            required
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />

                    </Grid>
                    <Grid item xs={6}>

                    <TextField
                            id="outlined-multiline-static"
                            label="Object Type"
                            multiline
                            rows={1}
                            onChange={(e) => handleChange(e)}
                            value={editdata.detaildata[0].Object_Type}
                            name="Object_Type"
                            variant="outlined"
                            required
                            disabled
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Feature Name"
                            multiline
                            rows={1}
                            onChange={(e) => handleChange(e)}
                            value={editdata.detaildata[0].Feature_Name}
                            name='Feature_Name'
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                            disabled
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={4}>
                        <Autocomplete
                            fullWidth
                            id="outlined-multiline-static"
                            options={[
                                { title: "Programlevel" },
                                { title: "Statementlevel" },

                            ]}
                            groupBy={""}
                            defaultValue={{ title: 'Programlevel' }}
                            getOptionLabel={(option) => option.title}
                            name="Level"
                            onChange={(e, v) => handlechangedropdownlevel(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Level"
                                    variant="outlined"
                                />
                            )}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>

                        <TextField
                            id="outlined-multiline-static"
                            label="Sequence No"
                            multiline
                            fullWidth
                            // onChange={(e, v) => handleChange(v)}
                            onChange={(e) => handleChange(e)}
                            rows={1}
                            name='Sequence_Number'
                            // defaultValue="Default Value"
                            value = {editdata.detaildata[0].Sequence_Number}
                            variant="outlined"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>
                    <Grid item xs={12}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Source Description"
                            multiline
                            rows={15}
                            // defaultValue="Default Value"
                            name="Source_FeatureDescription"
                            // value={editdata.detaildata[0].Source_FeatureDescription}
                            value={Source_FeatureDescription}
                            fullWidth
                            // onChange={(e, v) => handleChange(v)}
                            onChange={(e) => setSource_FeatureDescription(e.target.value)}
                            variant="outlined"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>



                    <Grid item xs={12}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Target Description"

                            fullWidth
                            name='Target_FeatureDescription'
                            multiline
                            rows={15}
                            onChange={(e) => setTarget_FeatureDescription(e.target.value)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            value={Target_FeatureDescription}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>




                    <Grid item xs={12}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Source Code"
                            multiline
                            rows={15}
                            name='Source_Code'
                            onChange={(e) => setSource_Code(e.target.value)}
                            // defaultValue="Default Value"
                            fullWidth
                            variant="outlined"
                            required
                            value={Source_Code}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Actual Target Code"
                            multiline
                            rows={15}
                            name='Target_ActualCode'
                            onChange={(e) => setTarget_ActualCode(e.target.value)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                            value={Target_ActualCode}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>





                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Expected Target Code"
                            multiline
                            rows={15}
                            name='Target_Expected_Output'
                            onChange={(e) => setTarget_Expected_Output(e.target.value)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                            value={Target_Expected_Output}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Conversion Code"
                            multiline
                            name='Conversion_Code'
                            rows={15}
                            onChange={(e) => setConversion_Code(e.target.value)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                            value={Conversion_Code}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    {/* <Grid item xs={12}>

                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Conversion Code Description"
                            multiline
                            name='Conversion_Description'
                            rows={15}
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                            value={editdata[0].Conversion_Description}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
 */}

                </Grid>


                <Box py={4}>
                    <Grid container direction='row' spacing={2}>
                        <Grid item style={{ marginTop: "6px" }}>
                            <Typography variant='body1'>   Source Attachemnts </Typography>

                        </Grid>
                        <Grid item>
                            <div className={classes.rootc}>
                                <input
                                    accept="file"
                                    className={classes.input}
                                    id="contained-button-file3"
                                    multiple={true}
                                    onChange={(e) => onchangefile_source(e, "Source_Attachment")}
                                    type="file"
                                />
                                <label htmlFor="contained-button-file3">
                                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                                        Upload
                                    </Button>
                                </label>

                            </div>
                        </Grid>

                        <Grid item style={{ marginTop: "6px" }}>
                            <Typography variant='body2'> Target Attachemnts :</Typography>

                        </Grid>
                        <Grid item>
                            <div className={classes.rootc}>
                                <input
                                    // accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file1"
                                    multiple={true}

                                    onChange={(e) => onchangefile_target(e, "Conversion_Attachment")}
                                    type="file"
                                />
                                <label htmlFor="contained-button-file1">
                                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                                        Upload
                                    </Button>
                                </label>

                            </div>
                        </Grid>
                        <Grid item style={{ marginTop: "6px" }}>
                            <Typography variant='body1'>   Conversion Attachemnts </Typography>

                        </Grid>
                        <Grid item>
                            <div className={classes.rootc}>
                                <input
                                    // accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file2"
                                    multiple={true}
                                    onChange={(e) => onchangefile_conver(e, "Target_Attachment")}
                                    type="file"
                                    name='Target_Attachment'
                                />
                                <label htmlFor="contained-button-file2">
                                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                                        Upload
                                    </Button>
                                </label>

                            </div>
                        </Grid>

                    </Grid>
                </Box>

                <Grid container py={3} lg={12}>
                    <Grid container xs={3} lg={4}>
                        <Grid item xs>
                            <Grid container direction='column'>
                                {source_att.map(item => {
                                    return (
                                        <>

                                            <Grid item>

                                                <Grid container direction='row' justifyContent='space-around'>

                                                    <Grid item>
                                                        <Typography variant='caption'>
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>



                                                    <Grid item>
                                                        <CloseIcon onClick={() => handledetale_source(item)} />
                                                    </Grid>
                                                </Grid>



                                            </Grid>

                                        </>
                                    )
                                })}

                            </Grid>
                        </Grid>



                    </Grid>

                    <Grid container xs={3} lg={4}>
                        <Grid item xs>
                            <Grid container direction='column'>
                                {target_att.map(item => {
                                    return (
                                        <>

                                            <Grid item>

                                                <Grid container direction='row' justifyContent='space-around'>

                                                    <Grid item>
                                                        <Typography variant='caption'>
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>



                                                    <Grid item>
                                                        <CloseIcon onClick={() => handledetale_target(item)} />
                                                    </Grid>
                                                </Grid>



                                            </Grid>

                                        </>
                                    )
                                })}

                            </Grid>
                        </Grid>



                    </Grid>
                    <Grid container xs={3} lg={4}>
                        <Grid item xs>
                            <Grid container direction='column'>
                                {conver_att.map(item => {
                                    return (
                                        <>

                                            <Grid item>

                                                <Grid container direction='row' justifyContent='space-around'>

                                                    <Grid item>
                                                        <Typography variant='caption'>
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>



                                                    <Grid item>
                                                        <CloseIcon onClick={() => handledetale_conv(item)} />
                                                    </Grid>
                                                </Grid>



                                            </Grid>

                                        </>
                                    )
                                })}

                            </Grid>
                        </Grid>



                    </Grid>
                </Grid>

                <Box py={5}>

                    <Grid container direction='row ' justifyContent='center' spacing={2}>

                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            // className={classes.submit}
                            onClick={handleConvert}

                            >
                                Convert
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.submit}
                                onClick={handleSubmit}

                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>



        </MenuAppBar>
    );
}
