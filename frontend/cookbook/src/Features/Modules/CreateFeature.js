import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
// import CreatePreview from './CreatePreview';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuAppBar from '../../Components/header'
import { Box, Grid, Typography } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import Menuaction from '../../Redux/actions/Menuaction';
import Notification from '../Notifications/Notification';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
    },
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
    var obj_type = props.location.state?.data?.Label
    obj_type = obj_type.slice(0, -1);
    const [prerunval, setPrerunval] = useState([]);
    const classes = useStyles();

    const [formValues, setformvalues] = useState({ Migration_TypeId: props.location.state?.data?.type, Object_Type: props.location.state?.data?.Label })
    const [file, setfile] = useState([])
    // const [AttachmentList, setAttachmentList] = useState({})
    const { headerValue } = useSelector(state => state.dashboardReducer);
    const [source_att, setSourceatt] = useState([])
    const [target_att, setTargetatt] = useState([])
    const [conver_att, setConveratt] = useState([])
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    // const [migtypeid, setMigtypeid] = useState()

    // const [seq, setSeq]=useState({})
    let sval=0;
    if (headerValue) {
        if (headerValue.title === 'Oracle To Postgres') {
            sval = 1
        }
        else if (headerValue.title === 'Oracle TO SQLServer') {

            sval = 2
        }
        else if (headerValue.title === 'Oracle To MYSQL') {

            sval = 3
        }
    }

    let body = {
        "Object_Type" :obj_type,
        "Migration_TypeId":sval
    } 

    useEffect(() => {
        axios.post(`http://127.0.0.1:8000/api/sequence`,body).then(
            (res) => {
                //   console.log(res);
                setPrerunval(res.data[0]);

                //   setIsdata(true);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [obj_type, headerValue.title]);

    useEffect(() => {
        
    }, [formValues]);



    


    const dispatach = useDispatch()
    // console.log(props.location.state?.data?.type)
    const handleSubmit = (e) => {
        let typeval = props.location.state?.data?.type
        let val = 0
        e.preventDefault();
        if (typeval) {
            if (typeval === 'Oracle To Postgres') {
                val = 1
            }
            else if (typeval === 'Oracle TO SQLServer') {

                val = 2
            }
            else if (typeval === 'Oracle To MYSQL') {

                val = 3
            }
        }

        let formData = {
            ...formValues,
            Migration_TypeId: val,
            Object_Type: obj_type,
            'Source_Attachment': source_att,
            "Conversion_Attachment": target_att,
            "Target_Attachment": conver_att
        }
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });

        axios.post("http://127.0.0.1:8000/api/create", form)
            .then(res => {
                // console.log(res.data)
                setNotify({
                    isOpen: true,
                    message: 'Feature Created Successfully',
                    type: 'success'
                })
            }, error => {
                console.log(error);
                setNotify({
                    isOpen: true,
                    message: 'Something Went Wrong! Please try Again',
                    type: 'error'
                })
            })



        dispatach(Menuaction.reloadAction(true))
    }



    const handleChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
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

                filesystem.push(file);
                setSourceatt(filesystem[0]);
            }
            // console.log(filesystem)
        } else {
            setSourceatt(null);
        }
    }


    const onchangefile_target = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push(file);
                setTargetatt(filesystem[0]);
            }
            // console.log(filesystem)
        } else {
            setTargetatt(null);
        }
    }
    const onchangefile_conver = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push(file);
                setConveratt(filesystem[0]);
            }
            // console.log(filesystem)
        }
        else {
            setConveratt(null);
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

    const handleConvert = (e) => {
        e.preventDefault();
        // console.log(formValues.Conversion_Code)
        // console.log(formValues.Source_Code)
        // console.log(formValues.Feature_Name)

        let body ={
            "sourcecode":formValues.Source_Code,
            "convcode":formValues.Conversion_Code,
            "featurename":formValues.Feature_Name
        }
        axios.post(`http://127.0.0.1:8000/api/convert_python_code1`, body)
            .then(res => {
                // console.log("res",res.data)
                setformvalues({
                    "Target_ActualCode": res.data
                })
                setNotify({
                    isOpen: true,
                    message: 'Conversion Completed Please Check The Output',
                    type: 'success'
                })
            }, error => {
                console.log(error);
                setNotify({
                    isOpen: true,
                    message: 'Something Went Wrong! Please try Again',
                    type: 'error'
                })
            })

    }

    // console.log(prerunval,'pre')
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
                <Grid container direction='row' spacing={4}>

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
                            value={obj_type}
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
                            // defaultValue={{ title: 'Programlevel' }}
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

                        {/* <TextField
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
                        /> */}
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel >Precision</InputLabel>
                            <Select
                                native
                                // value={state.age}
                                onChange={handleChange}
                                label="Precision"
                                name='Sequence'

                            >   <option value="Select Precision" selected>Select Precision</option>
                                <option value="No Precision" >No Precision</option>
                                {prerunval.map((item, ind) => {
                                    return <option value={item.Feature_Name}>{item.Feature_Name}</option>
                                })}
                            </Select>
                        </FormControl>



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
                            value={formValues.Target_ActualCode}
                            // disabled
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
                            label="Conversion Module"
                            multiline
                            name='Conversion_Code'
                            rows={15}
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid>

                    {/* <Grid item xs={12} sm={12} md={12} xl={12}>

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
                    </Grid> */}


                </Grid>


                <Box py={4}>
                    <Grid container direction='row' spacing={2}>
                        <Grid item style={{ marginTop: "6px" }} >
                            <Typography variant='body1'>   Source Attachemnts </Typography>

                        </Grid>
                        <Grid item >
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

                        <Grid item style={{ marginTop: "6px" }} >
                            <Typography variant='body2'> Target Attachemnts :</Typography>

                        </Grid>
                        <Grid item >
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
                        <Grid item style={{ marginTop: "6px" }} >
                            <Typography variant='body1'>   Conversion Attachemnts </Typography>

                        </Grid>
                        <Grid item>
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
                                {/* {source_att.map(item => {
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
                                })} */}
                                {source_att.name}

                            </Grid>
                        </Grid>



                    </Grid>

                    <Grid container xs={12} sm={4} md={4} xl={4}>
                        <Grid item>
                            <Grid container direction='column'>
                                {/* {target_att.map(item => {
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
                                })} */}
                                {target_att.name}

                            </Grid>
                        </Grid>



                    </Grid>
                    <Grid container xs={12} sm={4} md={4} xl={4}>
                        <Grid item>
                            <Grid container direction='column'>
                                {/* {conver_att.map(item => {
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
                                })} */}
                                {conver_att.name}

                            </Grid>
                        </Grid>



                    </Grid>
                </Grid>

                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <Box py={5}>

                    <Grid container direction='row ' justifyContent='center' spacing={2}>

                        <Grid item >
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

                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            // className={classes.submit}
                            // onClick={handleSubmit}

                            >
                                Deploy
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>



        </MenuAppBar >
    );
}
