import React from "react";
import libraryImage from "../assets/images/download.jpeg";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const styles = {
  root: {
    paddingTop: theme => theme.spacing(8),
    paddingBottom: theme => theme.spacing(3),
  },
  image: {
    height: 400,
    objectFit: "cover",
  },
  cardContent: {
    textAlign: "left",
  },
};

const About = () => {
  return (
    <Container sx={styles.root}>
      <Typography variant="h4" gutterBottom>
        ABOUT US
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ mt: 5 }}>
            <CardMedia
              sx={styles.image}
              component="img"
              alt="Library"
              src={libraryImage}
              title="Library"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent sx={styles.cardContent}>
              <Typography variant="h5" gutterBottom>
                About Horizon Library
              </Typography>
              <Typography variant="body1" paragraph>
                Horizon Library is a state-of-the-art facility dedicated to
                promoting knowledge, learning, and personal growth. We provide a
                vast collection of books, journals, multimedia resources, and
                digital content to cater to diverse interests and educational
                needs.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Contact Information:
              </Typography>
              <Typography variant="body1" gutterBottom>
                Location: 123 College Road, Cityville, Kerala, India
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email:{" "}
                <a href="mailto:info@horizonlibrary.com">
                  info@horizonlibrary.com
                </a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: +91 1234567890
              </Typography>
              <Typography variant="h5" gutterBottom>
                Opening Hours
              </Typography>
              <Typography variant="body1" gutterBottom>
                Monday to Thursday: 9:00 AM - 8:00 PM
              </Typography>
              <Typography variant="body1" gutterBottom>
                Friday: 9:00 AM - 6:00 PM
              </Typography>
              <Typography variant="body1" gutterBottom>
                Saturday: 10:00 AM - 5:00 PM
              </Typography>
              <Typography variant="body1" gutterBottom>
                Sunday: Closed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
