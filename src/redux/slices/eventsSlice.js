import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEventList } from "../../api/api";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ token, page, status, limit }, { rejectWithValue }) => {
    try {
      const response = await getEventList({
        token,
        page,
        status: status === "All" ? undefined : status,
        limit,
      });
      return {
        events: response.data.docs.map((event) => ({
          id: event._id,
          name: event.title,
          startDate: event.start_date,
          endDate: event.end_date,
          submissionCount: 0, // Placeholder as API doesn't provide this
          status:
            event.status.charAt(0).toUpperCase() +
            event.status.slice(1).toLowerCase(),
          visibility: event.visibility ? "Public" : "Private",
        })),
        totalPages: response.data.totalPages,
        currentPage: response.data.page,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    currentPage: 1,
    totalPages: 1,
    filterStatus: "All",
    limit: 10,
    sortConfig: { key: "title", direction: "asc" },
    isLoading: false,
    error: null,
  },
  reducers: {
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
      state.currentPage = 1; // Reset to page 1 on filter change
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.currentPage = 1; // Reset to page 1 on limit change
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    deleteEvents: (state, action) => {
      state.events = state.events.filter(
        (event) => !action.payload.includes(event.id)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload.events;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSortConfig,
  setFilterStatus,
  setLimit,
  setCurrentPage,
  deleteEvents,
} = eventsSlice.actions;
export default eventsSlice.reducer;
