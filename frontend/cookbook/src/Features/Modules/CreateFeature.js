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
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function CreateFeature() {
    const classes = useStyles();
    // const [value, setValue] = React.useState('Controlled');
    const [objecttype, setObjecettype] = React.useState('Procedure');
    const [versionid, setVersionid] = useState()
    const [migtype, setMigtype] = useState('1')
    const [source_code, setSource_code] = useState()
    const [source_FeatureDescription, setSource_FeatureDescription] = useState()
    const [target_FeatureDescription, setTarget_FeatureDescription] = useState()
    const [actualtarget_code, setActualtartget_code] = useState()
    const [expectedtarget_code, setExpectedtartget_code] = useState()
    const [conversion_code, setConversion_code] = useState()
    const [conversion_code_Despcrition, setConversion_code_Despcrition] = useState()
    const [featurename, setFeaturename] = useState()

    const handleObjecttype = (event) => {
        setObjecettype(event.target.value);
    };
    const handleVersionid = (event) => {
        setVersionid(event.target.value);
    };
    const handleMigtype = (event) => {
        setMigtype(event.target.value);
    };
    const handleSourcecode = (event) => {
        setSource_code(event.target.value);
    };
    const handleSourceDesc = (event) => {
        setSource_FeatureDescription(event.target.value);
    };
    const handleTargetDesc = (event) => {
        setTarget_FeatureDescription(event.target.value);
    };
    const handleActualtartget_code = (event) => {
        setActualtartget_code(event.target.value);
    };
    const handleTargetExpectedcode = (event) => {
        setExpectedtartget_code(event.target.value);
    };
    const handleConversion_code_Despcrition = (event) => {
        setConversion_code_Despcrition(event.target.value);
    };
    const handleConversion_code = (event) => {
        setConversion_code(event.target.value);
    };

    const handleFeaturename = (event) => {
        setFeaturename(event.target.value);
    };


    const handlePreviewdata = () => {
        let formData = {
            Migration_TypeId: migtype,
            Version_Id: versionid,
            Feature_Name: featurename,
            Object_Type: objecttype,
            Source_FeatureDescription: source_FeatureDescription,
            Source_Code: source_code,
            Conversion_Description: conversion_code_Despcrition,
            Conversion_Code: conversion_code,
            Target_FeatureDescription: target_FeatureDescription,
            Target_Expected_Output: expectedtarget_code,
            Target_ActualCode: actualtarget_code
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            Migration_TypeId: migtype,
            Version_Id: versionid,
            Feature_Name: featurename,
            Object_Type: objecttype,
            Source_FeatureDescription: source_FeatureDescription,
            Source_Code: source_code,
            Conversion_Description: conversion_code_Despcrition,
            Conversion_Code: conversion_code,
            Target_FeatureDescription: target_FeatureDescription,
            Target_Expected_Output: expectedtarget_code,
            Target_ActualCode: actualtarget_code

        }
        axios.post("http://127.0.0.1:8000/api/create", formData)
            .then(res => {
                console.log(res.data)
            }, error => {
                console.log(error);
            })

    }

    const ObjectTypes = [
        {
            value: 'Procedure',
            label: 'PROCEDURE',
        },
        {
            value: 'Function',
            label: 'FUNCTION',
        },
        {
            value: 'Package',
            label: 'PACKAGE',
        },
        {
            value: 'Trigger',
            label: 'TRIGGER',
        },
    ];
    const MigTypes = [
        {
            value: 1,
            label: 'Oracle To Postgres',
        },
        {
            value: 2,
            label: 'Oracle To SQLServer',
        },
        {
            value: 3,
            label: 'Oracle To MYSQL',
        }
    ];
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
                <Grid container direction='row' xs={12} spacing={4}>

                    <Grid item xs={6}>
                        <Autocomplete
                            fullWidth
                            id="grouped-demo"
                            options={[{ title: "material ui" }]}
                            groupBy={""}
                            getOptionLabel={(option) => option.title}

                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Migration Type"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            fullWidth
                            id="grouped-demo"
                            options={[{ title: "material ui" }]}
                            groupBy={""}
                            getOptionLabel={(option) => option.title}

                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Object Type"
                                    variant="outlined"
                                />
                            )}
                        />

                    </Grid>




                    <Grid item xs={6}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Feature Name"
                            multiline
                            rows={1}
                            // defaultValue="Default Value"
                            onChange={handleFeaturename}
                            variant="outlined"
                            required
                            fullWidth
                        />

                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                            id="outlined-multiline-static"
                            label="Version ID"
                            multiline
                            fullWidth
                            rows={1}
                            // defaultValue="Default Value"
                            onChange={handleVersionid}
                            variant="outlined"
                            required
                        />

                    </Grid>
                    <Grid item xs={6}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Source Description"
                            multiline
                            rows={10}
                            // defaultValue="Default Value"

                            fullWidth
                            onChange={handleSourceDesc}
                            variant="outlined"
                            required
                        />
                    </Grid>



                    <Grid item xs={6}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Target Description"

                            fullWidth
                            multiline
                            rows={10}
                            onChange={handleTargetDesc}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>




                    <Grid item xs={6}>


                        <TextField
                            id="outlined-multiline-static"
                            label="Source Code"
                            multiline
                            rows={10}
                            onChange={handleSourcecode}
                            // defaultValue="Default Value"
                            fullWidth
                            variant="outlined"
                            required
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Actual Target Code"
                            multiline
                            rows={10}
                            onChange={handleActualtartget_code}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>





                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Expected Target Code"
                            multiline
                            rows={10}
                            onChange={handleTargetExpectedcode}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Conversion Code"
                            multiline
                            rows={10}
                            onChange={handleConversion_code}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Conversion Code Description"
                            multiline
                            rows={10}
                            onChange={handleConversion_code_Despcrition}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>


                </Grid>


<Box py={4}>
    <Grid container direction='row'  spacing={3}>
        <Grid item>
            <Typography variant='body1'>   Source Attachemnts </Typography>
     
        </Grid>
        <Grid item>
        <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
        </Grid>

        <Grid item>
            <Typography variant='body1'> Target Attachemnts :</Typography>
       
        </Grid>
        <Grid item>
        <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
        </Grid>
    </Grid>
</Box>

                <Box py={5}>

                    <Grid container direction='row ' justifyContent='center' spacing={2}>

                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.submit}
                                onClick={handlePreviewdata}

                            >
                                Preview
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
