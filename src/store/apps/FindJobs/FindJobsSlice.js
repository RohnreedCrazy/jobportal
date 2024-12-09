import axios from '../../../utils/axios';
import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/FindJobs/jobsData';

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
  jobPostStatus: '', // To keep track of the status of the job posting
};

export const FindJobsSlice = createSlice({
  name: 'FindJobs',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
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
  setJobPostStatus, // Add this action to handle post status
} = FindJobsSlice.actions;

export const fetchjobs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getjobs(response.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

// New function for posting a job
export const postJob = (jobData) => async (dispatch) => {
  dispatch(setJobPostStatus('loading')); // Set the status to 'loading' before posting
  try {
    const response = await axios.post(`${API_URL}/postJob`, jobData); // Make a POST request to the API
    dispatch(setJobPostStatus('success')); // Set the status to 'success' if posting is successful
    dispatch(getjobs(response.data)); // Optionally fetch updated job list after posting
  } catch (error) {
    dispatch(setJobPostStatus('error')); // Set status to error if the request fails
    dispatch(hasError(error)); // Handle any errors
  }
};

export default FindJobsSlice.reducer;