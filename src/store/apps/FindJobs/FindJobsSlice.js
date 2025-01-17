import axios from '../../../utils/axios';
import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const API_URL = '/api/jobs';
const MySwal = withReactContent(Swal);

const initialState = {
  jobs: [],
  jobSearch: '',
  sortBy: 'newest',
  cart: [],
  total: 0,
  filters: {
    category: 'All',
    color: 'All',
    jobType: 'All',
    salary: 'All',
    rating: '',
  },
  error: '',
  jobPostStatus: '', // Ensure this is initialized as an empty string
};

export const FindJobsSlice = createSlice({
  name: 'FindJobs',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      // Store only the error message or response data
      state.error = action.payload?.message || action.payload || "An unknown error occurred.";
    },
    // GET jobs
    getjobs: (state, action) => {
      state.jobs = action.payload;
    },
    // Search job
    Searchjob: (state, action) => {
      state.jobSearch = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    // Sort jobs
    sortByjobs(state, action) {
      state.sortBy = action.payload;
    },
    sortByjobType(state, action) {
      state.filters.jobType = action.payload.jobType;
    },
    sortByColor(state, action) {
      state.filters.color = action.payload.color;
    },
    sortBysalary(state, action) {
      state.filters.salary = action.payload.salary;
    },
    // Filter jobs
    filterjobs(state, action) {
      state.filters.category = action.payload.category;
    },
    // Reset filters
    filterReset(state) {
      state.filters.category = 'All';
      state.filters.color = 'All';
      state.filters.jobType = 'All';
      state.filters.salary = 'All';
      state.sortBy = 'newest';
    },
    // Add to cart
    addToCart(state, action) {
      const job = action.payload;
      state.cart = [...state.cart, job];
    },
    // Delete from cart
    deleteCart(state, action) {
      const updateCart = filter(state.cart, (item) => item.id !== action.payload);
      state.cart = updateCart;
    },
    // Set job posting status (success, error, etc.)
    setJobPostStatus(state, action) {
      state.jobPostStatus = action.payload;
    },
  },
});

export const {
  hasError,
  getjobs,
  Searchjob,
  setVisibilityFilter,
  sortByjobs,
  filterjobs,
  sortByjobType,
  deleteCart,
  addToCart,
  sortBysalary,
  filterReset,
  sortByColor,
  setJobPostStatus,
} = FindJobsSlice.actions;

export const fetchjobs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getjobs(response.data.allJobs));
  } catch (error) {
    dispatch(hasError(error));
  }
};

// function for posting a job
export const postJob = (jobData) => async (dispatch) => {
  dispatch(setJobPostStatus("loading")); 

  try {
    const response = await axios.post(`/api/jobs`, jobData);

    dispatch(setJobPostStatus("success"));
    dispatch(getjobs(response.data)); 

    MySwal.fire({
      title: 'Success!',
      text: 'Your job has been posted successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

  } catch (error) {
    dispatch(setJobPostStatus("error"));
    dispatch(hasError(error.response?.data || error.message));

    MySwal.fire({
      title: 'Failed to post the job!',
      text: `There was an issue submitting your job post. Please try again`,
      icon: 'error',
      confirmButtonText: 'Retry',
    });
  }
};

export default FindJobsSlice.reducer;
