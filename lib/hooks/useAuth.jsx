"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetAuthenticatedUserQuery } from "@/redux/services/userApi";
import {
  AUTHENTICATION_STATUS,
  setAuthenticatedUser,
  setAuthenticationStatus,
} from "@/redux/features/authSlice";

import { AUTH_COOKIE_LS_NAME } from "../constants/config";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { authenticationStatus } = useAppSelector(({ auth }) => auth);

  const {
    data: retrievedUser,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetAuthenticatedUserQuery();

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(setAuthenticationStatus(AUTHENTICATION_STATUS.LOADING));
    } else {
      if (retrievedUser && isSuccess) {
        dispatch(setAuthenticatedUser(retrievedUser));
        dispatch(setAuthenticationStatus(AUTHENTICATION_STATUS.AUTHENTICATED));
      } else {
        dispatch(
          setAuthenticationStatus(AUTHENTICATION_STATUS.NOT_AUTHENTICATED)
        );
      }
    }
  }, [retrievedUser, dispatch, isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (authenticationStatus === AUTHENTICATION_STATUS.NOT_AUTHENTICATED) {
      localStorage.removeItem(AUTH_COOKIE_LS_NAME);
    }
  }, [authenticationStatus]);
};
