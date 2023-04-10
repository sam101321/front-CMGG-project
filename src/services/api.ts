import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { UseQueryResult } from "react-query";
import { getAccessToken } from "./Token";

// const value: string | undefined = Cookies.get("my-cookie");

export type QueryKey = [string, string, string, number?, string?];
export const getAllCoins = () =>
  instance.get("coins").then((res) => res.data.slice(0, 100));

interface UserNameLoginParams {
  username: string;
  password: string;
}

interface PostRefreshTokenParams {
  refresh: string;
  access: string;
}

interface LectureAndCategoryAndSearchParams {
  queryKey: string[];
}

interface PostReviewParams {
  lectureNum: string;
  data: any;
}

interface PostReplyParams {
  lectureNum: string;
  reviewNum: string;
  data: any;
}

interface SavePlayedSecondsParams {
  lectureId: string;
  num: string;
  lastPlayed: number;
}

interface WatchedLectures80Params {
  lectureId: string;
  num: string;
  is_completed: boolean;
  lastPlayed: number;
}

interface FetchVideoListParams {
  queryKey: string[];
}

export const instance: AxiosInstance = axios.create({
  baseURL: "https://crazyform.store/api/v1/",
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
    Authorization: "Bearer " + Cookies.get("access"),
  },
  withCredentials: true,
});

export const instanceNotLogin = axios.create({
  baseURL: "https://www.crazyform.store/api/v1/",
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
  },

  withCredentials: true,
});

export const getLectureAndCategoryAndSearch = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  const [, bigCategory, smallCategory, page = 1, searchName] = queryKey;

  if (searchName) {
    return await instanceNotLogin
      .get(
        `lectures/${bigCategory}/${smallCategory}/?page=${page}&search=${searchName}`
      )
      .then((res) => res.data);
  } else {
    return await instanceNotLogin
      .get(`lectures/${bigCategory}/${smallCategory}/?page=${page}`)
      .then((res) => res.data);
  }
};
export const getAllLectures = () =>
  instance.get("lectures/all/all").then((res) => res.data);
export const getLectureDetail = (page: number) => {
  return instance.get(`lectures/${page}`).then((res) => res.data);
};

