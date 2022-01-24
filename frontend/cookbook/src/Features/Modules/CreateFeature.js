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

export default function CreateFeature(props) {
    const classes = useStyles();

    const [formValues, setformvalues] = useState({ Migration_TypeId: props.location.state?.data?.type, Object_Type: props.location.state?.data?.Label })
    const [file, setfile] = useState([])
    // const [AttachmentList, setAttachmentList] = useState({})
    const { headerValue } = useSelector(state => state.dashboardReducer);
    const [source_att, setSourceatt] = useState([])
    const [target_att, setTargetatt] = useState([])
    const [conver_att, setConveratt] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            ...formValues,
            Migration_TypeId: headerValue?.title,
            Object_Type: props.location.state?.data?.Label,
            "upload_files": {
                'Source_Attachment': source_att[0].name,
                "Conversion_Attachment": conver_att[0].name,
                "Target_Attachment": target_att[0].name
            }

        }
        axios.post("http://127.0.0.1:8000/api/create", formData)
            .then(res => {
                console.log(res.data)
            }, error => {
                console.log(error);
            })

    }

    const handleChange = (e) => {
        setformvalues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handlechangedropdown = (v) => {
        setformvalues({
            ...formValues,
            "Migration_TypeId": v.title
        })


    }

    const handlechangedropdownlevel = (v) => {
        setformvalues({
            ...formValues,
            "Level": v.title
        })


    }
    const handlechangedropdownobj = (v) => {
        setformvalues({
            ...formValues,
            "Object_Type": v.code
        })


    }
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
                setSourceatt(filesystem);
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
                setTargetatt(filesystem);
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
                setConveratt(filesystem);
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


    return (

        <MenuAppBar>
            <Box py={4}>
                <Grid container direction='row' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h6'>
                            Create Feature
                        </Typography>
                    </Grid>

                </Grid>
            </Box>

            <form autoComplete="off">
                <Grid container direction='row'  spacing={4}>

                    <Grid item xs={12} sm={6} md={6} xl={6}>
                        {/* <Autocomplete
                            fullWidth
                            id="grouped-demo"
                            options={[
                                { title: "Oracle To Postgres" },
                                { title: "Oracle TO SQLServer" },
                                { title: "Oracle To MYSQL" },
                            ]}
                            groupBy={""}
                            defaultValue={{ title: props.location.state?.data?.type }}
                            getOptionLabel={(option) => option.title}
                            name="Migration_TypeId"
                            onChange={(e, v) => handlechangedropdown(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Migration Type"
                                    variant="outlined"
                                />
                            )}
                        /> */}


                        <TextField
                            id="outlined-multiline-static"
                            label="Migration Type"
                            multiline
                            rows={1}
                            onChange={(e) => handleChange(e)}
                            label="Migration Type"
                            // defaultValue="Default Value"
                            value={headerValue?.title}
                            variant="outlined"
                            required
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} md={6} xl={6}>
                        {/* <Autocomplete
                            fullWidth
                            id="grouped-demo"
                            options={[
                                { title: "Procedure", code: 'Procedure' },
                                { title: "Function", code: 'Function' },
                                { title: "Package", code: 'Package' },
                            ]}
                            groupBy={""}
                            getOptionLabel={(option) => option.title}
                            defaultValue={{ title: props.location.state?.data?.Label }}
                            name="Object_Type"
                            onChange={(e, v) => handlechangedropdownobj(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="Object_Type"
                                    fullWidth
                                    label="Object Type"
                                    variant="outlined"
                                />
                            )}
                        /> */}

                        <TextField
                            id="outlined-multiline-static"
                            name="Object_Type"
                            fullWidth
                            label="Object Type"
                            multiline
                            rows={1}
                            onChange={(e) => handleChange(e)}

                            // defaultValue="Default Value"
                            value={props.location.state?.data?.Label}
                            variant="outlined"
                            required
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />

                    </Grid>




                    <Grid item xs={12} sm={4} md={4} xl={4}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Feature Name"
                            multiline
                            rows={1}
                            onChange={(e) => handleChange(e)}
                            name='Feature_Name'
                            // defaultValue="Default Value"

                            variant="outlined"
                            required
                            fullWidth
                        />

                    </Grid>

                    <Grid item xs={12} sm={4} md={4} xl={4}>
                        <Autocomplete
                            fullWidth
                            id="grouped-demo"
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
                        />



                    </Grid>
                    <Grid item xs={12} sm={4} md={4} xl={4}>

                        <TextField
                            id="outlined-multiline-static"
                            label="Sequence No"
                            multiline
                            fullWidth
                            onChange={(e) => handleChange(e)}
                            rows={1}
                            name='Sequence_Number'
                            // defaultValue="Default Value"

                            variant="outlined"
                            required
                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Source Description"
                            multiline
                            rows={15}
                            // defaultValue="Default Value"
                            name="Source_FeatureDescription"

                            fullWidth
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            required
                        />
                    </Grid>



                    <Grid item xs={12} sm={12} md={12} xl={12}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Target Description"

                            fullWidth
                            name='Target_FeatureDescription'
                            multiline
                            rows={15}
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>




                    <Grid item xs={12} sm={12} md={12} xl={12}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Source Code"
                            multiline
                            rows={15}
                            name='Source_Code'
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            fullWidth
                            variant="outlined"
                            required
                        />
                    </Grid>


                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Actual Target Code"
                            multiline
                            rows={15}
                            name='Target_ActualCode'
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>





                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Expected Target Code"
                            multiline
                            rows={15}
                            name='Target_Expected_Output'
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Conversion Code"
                            multiline
                            name='Conversion_Code'
                            rows={15}
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={12}>

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
                        />
                    </Grid>


                </Grid>


                <Box py={4}>
                    <Grid container direction='row' spacing={2}>
                        <Grid item style={{ marginTop: "6px" }} xs={6} sm={2} md={2} xl={2}>
                            <Typography variant='body1'>   Source Attachemnts </Typography>

                        </Grid>
                        <Grid item xs={6} sm={2} md={2} xl={2}>
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

                        <Grid item style={{ marginTop: "6px" }} xs={6} sm={2} md={2} xl={2}>
                            <Typography variant='body2'> Target Attachemnts :</Typography>

                        </Grid>
                        <Grid item xs={6} sm={2} md={2} xl={2}>
                            <div className={classes.rootc}>
                                <input
                                    accept="file"
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
                        <Grid item style={{ marginTop: "6px" }} xs={6} sm={2} md={2} xl={2}>
                            <Typography variant='body1'>   Conversion Attachemnts </Typography>

                        </Grid>
                        <Grid item xs={6} sm={2} md={2} xl={2}>
                            <div className={classes.rootc}>
                                <input
                                    accept="file"
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

                <Grid container>
                    <Grid containr xs={12} sm={4} md={4} xl={4}>
                        <Grid item >
                            <Grid container direction='column'>
                                {source_att.map(item => {
                                    return (
                                        <>

                                            <Grid item>

                                                <Grid container direction='row'>

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

                    <Grid container xs={12} sm={4} md={4} xl={4}>
                        <Grid item>
                            <Grid container direction='column'>
                                {target_att.map(item => {
                                    return (
                                        <>

                                            <Grid item>

                                                <Grid container direction='row' justify='space-around'>

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
                    <Grid container xs={12} sm={4} md={4} xl={4}>
                        <Grid item>
                            <Grid container direction='column'>
                                {conver_att.map(item => {
                                    return (
                                        <>

                                            <Grid item>

                                                <Grid container direction='row' justify='space-around'>

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

                        <Grid item >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            // className={classes.submit}
                            // onClick={handlePreviewdata}

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
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>



        </MenuAppBar>
    );
}
