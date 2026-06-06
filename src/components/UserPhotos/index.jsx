import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";

import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";

function formatDate(date) {
  return new Date(date).toLocaleString("vi-VN");
}

function UserPhotos({ setTitle }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch(`https://n2rh2r-8081.csb.app/api/user/${userId}`,{
      credentials:"include",
    })
      .then((res) => res.json())
      .then((data) =>
        setTitle(`Photo Of ${data.first_name} ${data.last_name}`)
      );
    fetch(`https://n2rh2r-8081.csb.app/api/photo/photosOfUser/${userId}`,{
      credentials:"include",
    })
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, [userId]);
  return (
    <>
      {photos.length === 0 && <p>Loading...</p>}
      {photos.map((photo) => (
        <Box>
          <img
            src={
              photo.file_name.startsWith("http")
                ? photo.file_name
                : `/images/${photo.file_name}`
            }
            alt="photo"
          />
          <Typography>{formatDate(photo.date_time)}</Typography>
          <Typography variant="h5">Comments</Typography>
          {photo.comments.map((c) => (
            <Box>
              <Typography
                variant="h8"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/users/${c.user._id}`)}
              >
                {c.user?.first_name} {c.user?.last_name}
              </Typography>
              <Typography>{formatDate(c.date_time)}</Typography>
              <Typography>{c.comment}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}

export default UserPhotos;
