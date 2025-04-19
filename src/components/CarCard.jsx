import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function CarCard({ car, deleteCar }) {
  return (
    <Card sx={{ maxWidth: 345 }} data-testid="CarCard">
      <CardMedia
        sx={{ objectPosition: "0 25%" }}
        component="img"
        alt={`${car.brand} ${car.model}`}
        height="140"
        image={car.photo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${car.brand} ${car.model}`}
        </Typography>
        <Typography width={300} variant="body2" color="text.secondary">
          {`${car.segment} ${car.fuel}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid display="flex" size={{ xs: 9 }}>
            <Typography
              sx={{ marginTop: "5px", paddingLeft: "8px" }}
              variant="h5"
              color="green"
            >
              {car.price}
              <Typography sx={{ marginLeft: "5px" }} variant="overline">
                EUR
              </Typography>
            </Typography>
          </Grid>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            size={{ xs: 2 }}
            data-testid="buttonContainer"
          >
            <Button
              onClick={() => deleteCar(car.key)}
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
