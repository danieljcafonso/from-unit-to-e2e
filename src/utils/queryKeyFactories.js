export const carKeys = {
  all: () => ["allCars"],
  api: () => [{ queryIdentifier: "api" }],
  carMutation: () => ["userMutation"],
  withUsername: (username = "username") => [{ ...carKeys.api()[0], username }],
};
