import { http, HttpResponse } from "msw";
import {
  dummyUserData,
  dummyCarCreateData,
  dummyCarList,
} from "../utils/test-utils";

export const handlers = [
  // Handles a POST /login request
  http.post("*/carslogin*", () => {
    return HttpResponse.json(dummyUserData);
  }),
  http.post("*/carsuser*", () => {
    return HttpResponse.json(dummyUserData);
  }),
  http.post("*/cars*", () => {
    return HttpResponse.json(dummyCarCreateData);
  }),
  http.get("*/cars*", () => {
    return HttpResponse.json(dummyCarList);
  }),
  http.delete("*/cars*", () => {
    return HttpResponse.json({});
  }),
];
