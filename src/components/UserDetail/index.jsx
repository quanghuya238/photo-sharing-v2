import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";

import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";

function UserDetail({ setTitle }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`https://n2rh2r-8081.csb.app/api/user/${userId}`,{
      credentials:"include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(`Detail Of ${data.first_name} ${data.last_name}`);
        setUser(data);
      });
  }, [userId]);
  if (!user) return "Loading...";
  return (
    <>
      <Typography variant="body1">
        {user.first_name} {user.last_name}
      </Typography>
      <Box>
        {user.location && <p>Location:{user.location}</p>}
        {user.occupation && <p>Occupation:{user.occupation}</p>}
        {user.description && <p>Description:{user.description}</p>}
        <Button
          variant="contained"
          onClick={() => navigate(`/photos/${user._id}`)}
        >
          View Photos
        </Button>
      </Box>
    </>
  );
}

export default UserDetail;
