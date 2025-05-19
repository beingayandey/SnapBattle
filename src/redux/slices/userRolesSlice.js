import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
// import { db } from "../../firebase"; // Adjust path to your Firebase config

export const fetchUsers = createAsyncThunk("userRoles/fetchUsers", async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});

export const updateUserRole = createAsyncThunk(
  "userRoles/updateUserRole",
  async ({ email, role }, { rejectWithValue }) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return rejectWithValue("User not found");
      }
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "users", userDoc.id), { role });
      return { id: userDoc.id, email, role };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userRolesSlice = createSlice({
  name: "userRoles",
  initialState: {
    users: [],
    loading: false,
    modalOpen: false,
    selectedUser: null,
    error: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalOpen = true;
      state.selectedUser = action.payload.user;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        const user = state.users.find((u) => u.id === id);
        if (user) {
          user.role = role;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { openModal, closeModal } = userRolesSlice.actions;
export default userRolesSlice.reducer;
