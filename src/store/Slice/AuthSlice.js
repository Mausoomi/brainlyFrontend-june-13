import { createSlice } from "@reduxjs/toolkit";
import {
  EditProfile_Student,
  Edit_Profile_Password,
  Find_Email,
  Get_Count_Student,
  MatchOTP,
  Reset_Password,
  SignUp_user,
  Signin_user,
  async_loaduser,
  async_removeuser,
} from "../Actions/Authactions";
import { toast } from "react-toastify";

let initialState = {
  user: [],
  userType: null,
  isAuthenticated: false,
  loading: false,
  FoundedUser: [],
  Message: [],
  WordCount: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUp_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignUp_user.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          // console.log(action.payload);
          state.user = action.payload.data;
          state.userType = action.payload.data.UserType;
          state.isAuthenticated = true;
          state.loading = false;
          toast.success("User SignUp Successfully");
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(SignUp_user.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Signin_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signin_user.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.user = action.payload.data;
          state.userType = action.payload.data.UserType;
          state.isAuthenticated = true;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Signin_user.rejected, (state) => {
        state.loading = false;
      })
      .addCase(async_loaduser.pending, (state) => {
        state.loading = true;
      })
      .addCase(async_loaduser.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.userType = action.payload.UserType;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(async_loaduser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(async_removeuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(async_removeuser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.userType = null;
        state.loading = false;
      })
      .addCase(async_removeuser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Find_Email.pending, (state) => {
        state.loading = true;
      })
      .addCase(Find_Email.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.existingUser) {
          state.FoundedUser = action.payload.existingUser;

          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Find_Email.rejected, (state) => {
        state.loading = false;
      })
      .addCase(MatchOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(MatchOTP.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.message) {
          state.Message = action.payload.message;
          state.loading = false;
          toast.success("OTP Matched SuccessFully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(MatchOTP.rejected, (state) => {
        state.loading = false;
      })

      .addCase(Reset_Password.pending, (state) => {
        state.loading = true;
      })
      .addCase(Reset_Password.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.user = action.payload.data;
          state.userType = action.payload.data.UserType;
          state.isAuthenticated = true;
          state.loading = false;
          toast.success("Password Changed SuccessFully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Reset_Password.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Get_Count_Student.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_Count_Student.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload && action.payload.data) {
          state.WordCount = action.payload.data.existingCount;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Get_Count_Student.rejected, (state) => {
        state.loading = false;
      })
      .addCase(EditProfile_Student.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditProfile_Student.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          toast.success(action.payload.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(EditProfile_Student.rejected, (state) => {
        state.loading = false;
      })
      // Edit_Profile_Password
      .addCase(Edit_Profile_Password.pending, (state) => {
        state.loading = true;
      })
      .addCase(Edit_Profile_Password.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          toast.success(action.payload.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Edit_Profile_Password.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
