import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const handleOnSubmit = (e) => {
  console.log(e);
  
  // Event.preventDefault();
  // const first_Name = Event.traget.first_Name.value;
  // const Last_Name = Event.traget.Last_Name.value;
  // const address = Event.traget.address.value;
  // const mobile_no = Event.traget.mobile_no.value;
  // const company_name = Event.traget.company_name.value;
  // const company_address = Event.traget.company_address.value;
  // const company_contact = Event.traget.company_contact.value;


  // let dataState;
  // axios.post('http://192.168.29.12:5000/api/addEdit',{
  //   first_Name,Last_Name,address,mobile_no,company_name,company_address,company_contact
  // })

  // .then((response) => {
  //    console.log(response);
  // })
  // .catch((error) =>{
  //    console.log(error);
  // });


};

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const getSteps = () => {
  return [
    "Basic information",
    "Contact Information",
    "Personal Information",
  ];
}

const getStepContent = (step,handleOnChange,data) => {
  switch (step) {
    case 0:
      return (
        <>
          <TextField
            id="first_name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="normal"
            name="first_name"
            value={data.step_1?.first_name!==undefined ?data.step_1?.first_name:""}
            onChange={(e)=>handleOnChange("first_name",e.target.value,"step_1")}
          />
          <TextField
            id="last_name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            name="last_name"
            value={data.step_1?.last_name!==undefined ?data.step_1?.last_name:""}
            onChange={(e)=>handleOnChange("last_name",e.target.value,"step_1")}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            placeholder="Enter Your Address"
            fullWidth
            margin="normal"
            name="address"
            value={data.step_1?.address!==undefined ?data.step_1?.address:""}
            onChange={(e)=>handleOnChange("address",e.target.value,"step_1")}

          />
        </>
      );

    case 1:
      return (
        <>
          <TextField
            id="mobile_no"
            label="Mobile No."
            variant="outlined"
            placeholder="Enter Your Mobile No."
            fullWidth
            margin="normal"
            name="mobile_no"
            value={data.step_2?.mobile_no!==undefined ?data.step_2?.mobile_no:""}
            onChange={(e)=>handleOnChange("mobile_no",e.target.value,"step_2")}

          />
          <TextField
            id="company_name"
            label="Company Name"
            variant="outlined"
            placeholder="Enter Your Company Name"
            fullWidth
            margin="normal"
            name="company_name"
            value={data.step_2?.company_name!==undefined ?data.step_2?.company_name:""}
            onChange={(e)=>handleOnChange("company_name",e.target.value,"step_2")}

          />
        </>
      );
    case 2:
      return (
        <>
          <TextField
            id="company_address"
            label="Company Address"
            variant="outlined"
            placeholder="Enter Your Company Address"
            fullWidth
            margin="normal"
            name="company_address"
            value={data.step_3?.company_address!==undefined ?data.step_3?.company_address:""}
            onChange={(e)=>handleOnChange("company_address",e.target.value,"step_3")}

          />
          <TextField
            id="company_contact"
            label="Company Contact"
            variant="outlined"
            placeholder="Enter Your Company Contact"
            fullWidth
            margin="normal"
            name="company_contact"
            value={data.step_3?.company_contact!==undefined ?data.step_3?.company_contact:""}
            onChange={(e)=>handleOnChange("company_contact",e.target.value,"step_3")}
          />

        </>
      );
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [data,setData] = useState({});

  function handleOnChange(name,value,step){
    let d = {...data};
    if(d[step]!==undefined){
      d[step][name] = value;
    }
    else{
      d[step]={};
      d[step][name] = value;
    }
    setData(d);
  }
  function handleOnSubmit (name,value){
    let d = {...data};
    d[name] = value;
  setData(d);
  }

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  // const handleNext = () => {
    
  //   let nextStep =activeStep + 1; 
  //   setActiveStep(nextStep);
  //   if(nextStep===1){
  //     handleOnSubmit(data);
  //   }
  // }

  const handleNext = () => {
    let nextStep =activeStep + 1; 
    setActiveStep(nextStep);
    console.log("step 1",data["step_1"]);
    console.log("step 2",data["step_2"]);
    console.log("step 3",data["step_3"]);
      //handleOnSubmit(data);
    //}
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
          {/* <img src = {Img} alt="img.png" />   */}
        </Typography>
       
      ) : (
        <>
          <form>{getStepContent(activeStep,handleOnChange,data)}</form>
          <Button
            className={classes.button}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            back
          </Button>
          {isStepOptional(activeStep) && (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSkip}
            >
              skip
            </Button>
          )}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>

        </>
      )}
    </div>
  );
 };

export default LinaerStepper;
