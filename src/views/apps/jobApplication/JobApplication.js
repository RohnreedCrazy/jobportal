import React from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import MultipleValuesAutocomplete from 'src/components/forms/form-elements/autoComplete/MultipleValuesAutocomplete';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
import CountrySelectAutocomplete from '../../../components/forms/form-elements/autoComplete/CountrySelectAutocomplete';
import { fetchjobs } from 'src/store/apps/FindJobs/FindJobsSlice';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const steps = ['Basic Info', `Resume & Portfolio`, 'Post'];

const JobPost = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { id } = useParams();
  const [formData, setFormData] = React.useState({
    id:id,
    name: "",
    email: "",
    mobile: "",
    location: "",
    salary: "",
    applicationDeadline: "",
    maxApplicants: "",
    positionsAvailable: "",
    skills: [],
    experience: "",
    companyDescription: "",
    portfolioURL: "",
    resume: ""
  });
  const [errors, setErrors] = React.useState({});

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resumePreviewURL, setResumePreviewURL] = React.useState(null);
  React.useEffect(() => {
    dispatch(fetchjobs()); // Fetch jobs data on component mount
  }, [dispatch]);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const validateForm = () => {
    const errors = {};

    if (activeStep === 0) {
      // Validate fields for Step 0
      if (!formData.name) {
        errors.name = "Name is required.";
      }
      if (!formData.email) {
        errors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email address.";
      }
      if (!formData.mobile) {
        errors.mobile = "Phone number is required.";
      } else if (!/^\d+$/.test(formData.mobile)) {
        errors.mobile = "Please enter a valid phone number.";
      }
      if (!formData.location) {
        errors.location = "Location is required.";
      }
      if (!formData.salary) {
        errors.salary = "Desired Salary is required.";
      } else if (isNaN(formData.salary)) {
        errors.salary = "Salary must be a valid number.";
      }
      if (formData.skills.length === 0) {
        errors.skills = "At least one skill is required.";
      }
      if (!formData.experience) {
        errors.experience = "Experience is required.";
      }
    } else if (activeStep === 1) {
      // Validate fields for Step 1
      if (!formData.portfolioURL) {
        errors.portfolioURL = "Portfolio URL is required.";
      } else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(formData.portfolioURL)) {
        errors.portfolioURL = "Please enter a valid URL.";
      }
      if (!formData.resume) {
        errors.resume = "Resume is required.";
      }
    }

    return errors;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        MySwal.fire({
          title: "Invalid File Type",
          text: "Only PDF files are allowed for resumes.",
          icon: "error",
        });
        return;
      }

      setFormData({ ...formData, resume: file });
      const fileURL = URL.createObjectURL(file);
      setResumePreviewURL(fileURL); // Generate a preview URL for the uploaded PDF
    }
  };

  const handleNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      MySwal.fire({
        title: "Error!",
        text: "Please correct the errors in the form.",
        icon: "error",
        confirmButtonText: "Got it",
      });
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const postJobData = async () => {
    console.log(`this is formData,`, formData);
    try {
      const response = await fetch('https://your-api-endpoint.com/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        MySwal.fire({
          title: "Success!",
          text: "Your application has been submitted successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/apps/jobpost");
          }
        });
      } else {
        throw new Error('Failed to post job');
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: error.message || `Server Error`,
        icon: "error",
        confirmButtonText: "Okay"
      });
    }
  };

  const CompanySuccess = () => {
    postJobData();
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <CustomFormLabel>Basic Info</CustomFormLabel>
            <Typography>Fill in the your information</Typography>
            <CustomFormLabel htmlFor="name">Full name</CustomFormLabel>
            <CustomTextField
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              placeholder="your email"
            />
            <CustomFormLabel htmlFor="mobile">Phone Number</CustomFormLabel>
            <CustomTextField
              id="mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              variant="outlined"
              fullWidth
              error={!!errors.mobile}
              helperText={errors.mobile}
              placeholder="+91-1234567890"
            />
            <CustomFormLabel htmlFor="location">Location</CustomFormLabel>
            <CountrySelectAutocomplete
              value={formData.location}
              onChange={(e, newValue) => setFormData({ ...formData, location: newValue })}
              error={!!errors.location}
              helperText={errors.location}
            />
            <CustomFormLabel htmlFor="salary">Desired Salary</CustomFormLabel>
            <CustomTextField
              id="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              variant="outlined"
              fullWidth
              error={!!errors.salary}
              helperText={errors.salary}
              placeholder="$5000"
            />

            <CustomFormLabel>Your main Skills</CustomFormLabel>
            <MultipleValuesAutocomplete
              value={formData.skills}
              onChange={(event, newSkills) => setFormData({ ...formData, skills: newSkills })}
              error={!!errors.skills}
              helperText={errors.skills}
            />
            <CustomFormLabel>Your Experience</CustomFormLabel>
            <ReactQuill
              value={formData.experience}
              onChange={(value) => setFormData({ ...formData, experience: value })}
              placeholder="Please enter your experience accurately."
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <CustomFormLabel>Your Resume & Portfolio</CustomFormLabel>
            <Typography>Improve your profile.</Typography>

            {/* Portfolio URL */}
            <CustomFormLabel htmlFor="portfolioURL">Your Portfolio URL</CustomFormLabel>
            <CustomTextField
              id="portfolioURL"
              value={formData.portfolioURL}
              onChange={(e) => setFormData({ ...formData, portfolioURL: e.target.value })}
              variant="outlined"
              fullWidth
              error={!!errors.portfolioURL}
              helperText={errors.portfolioURL}
              placeholder="https://your_portfolio_url..."
            />

            {/* Resume Upload */}
            <Box>
              <CustomFormLabel htmlFor="resume">Upload your Resume (PDF only)</CustomFormLabel>

              {!formData.resume ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #ccc',
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                  onClick={() => document.getElementById('resume').click()}
                >
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    Drag & drop your resume here, or click to upload.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Choose File
                  </Button>
                  <input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </Box>
              ) : (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="subtitle1">Uploaded Resume:</Typography>
                  {resumePreviewURL && (
                    <iframe
                      src={resumePreviewURL}
                      width="100%"
                      height="500px"
                      title="Resume Preview"
                      style={{ border: '1px solid #ccc', marginBottom: '10px' }}
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => document.getElementById('resume').click()}
                    sx={{ marginRight: 2 }}
                  >
                    Replace Resume
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setFormData({ ...formData, resume: null });
                      setResumePreviewURL(null);
                    }}
                  >
                    Remove Resume
                  </Button>
                  <input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <CustomFormLabel>Finalize your post</CustomFormLabel>
            <Typography>Check all information and submit</Typography>
            <Button variant="contained" color="primary" onClick={CompanySuccess}>
              Submit
            </Button>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <PageContainer>
      <Breadcrumb title="Job Application" description="this is Job Application page" />
      <ParentCard title="Please fill out your application accurately so that your employer can see it.">
      <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Stack spacing={2} mt={3}>
                <Alert severity='success' mt={2}>All steps completed - you&apos;re finished</Alert>
                <Box textAlign="right" display="flex" gap="8px" justifyContent="flex-end">
                  <Button onClick={handleReset} variant="contained" color="error">
                    Reset
                  </Button>
                  <Button onClick={CompanySuccess} variant="contained" color="primary">
                    Post
                  </Button>
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box>{handleSteps(activeStep)}</Box>

              <Box display="flex" flexDirection="row" mt={3}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box flex="1 1 auto" />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default JobPost;