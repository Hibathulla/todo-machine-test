"use client";

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axiosInstance from "../axios-config";

interface PropeType {
  start?: boolean;
  initialData?: any;
  dep?: boolean | number | string;
  page?: number;
  pageSize?: number;
}

interface MutateProps {
  postData?: any;
  isFormData?: boolean;
}

export const useFetch = <dataType>(
  url: string,
  options: AxiosRequestConfig,
  { initialData, start, dep, page, pageSize }: PropeType,
  postData?: any
) => {
  const [data, setData] = useState<dataType | null>(initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isCompleted, setisCompleted] = useState(false);

  async function deleteRequest() {
    try {
      setIsLoading(true);

      const { data: response } = await axiosInstance.delete(url, {
        headers: {
          // 'Content-Type': 'application/json',
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      return { error: err, status: false };
      // setIsLoading(false)
    }
  }

  async function mutateRequest({ postData, isFormData = false }: MutateProps) {
    try {
      setIsLoading(true);
      if (postData) {
        const { data: response } = await axiosInstance.post(url, postData, {
          headers: {
            // 'Content-Type': 'application/json',
            "Content-Type": isFormData
              ? "multipart/formdata"
              : "application/json",
          },
        });
        setIsLoading(false);
        return response;
      }
    } catch (err) {
      setIsLoading(false);
      return { error: err, status: false };
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append('Authorization', `Bearer `)
        const requestOptions: any = {
          ...options,
          // headers: {
          //   'Content-Type': 'application/json'
          // }
        };

        const response: AxiosResponse<dataType> = await axiosInstance(
          url,
          requestOptions
        );
        if (!response.status) throw new Error(response.statusText);
        // const json = await response.json()
        // const { data } = json
        setData(response.data);
      } catch (error) {
        console.log(error, "error");
        if ((error as AxiosError)!.response!.status === 401) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return Promise.reject(error);
        }
        setError(`${error} Could not Fetch Data`);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        setisCompleted(true);
      }
    };
    start && fetchData();
  }, [url, dep, start, page, pageSize]);

  return {
    data,
    isLoading,
    error,
    isCompleted,
    setIsLoading,
    mutateRequest,
    deleteRequest,
  };
};
