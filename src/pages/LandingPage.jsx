import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomButton from "../components/CustomButton";

export const LandingPage = () => (
  <Box sx={{ height: "90%", overflow: "hidden" }}>
    <Grid container sx={{ height: "90%" }}>
      <Grid size={{ xs: 2 }}></Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        size={{ xs: 4 }}
      >
        <Typography variant="h2">
          From Unit to E2Es — A Testing Guide to Sleeping Better at Night
        </Typography>
        <CustomButton sx={{ marginTop: "2rem" }}>
          Here is a button to query
        </CustomButton>
      </Grid>
      <Grid
        size={{ xs: 6 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <img
            height={200}
            alt="octopus"
            src="https://avatars.githubusercontent.com/u/49996085?s=200&v=4"
          />
          <img
            height={200}
            alt="goat"
            src="https://raw.githubusercontent.com/testing-library/react-testing-library/main/other/goat.png"
          />
          <img
            height={200}
            alt="masks"
            src="https://avatars.githubusercontent.com/u/89237858?v=4"
          />
        </div>
      </Grid>
    </Grid>
  </Box>
);

export default LandingPage;
