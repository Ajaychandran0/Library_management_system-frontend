import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";

const EditAccountForm = ({ onCancel, onSubmit }) => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleSubmit = e => {
    e.preventDefault();
    const updatedAccountInfo = { name, email };
    onSubmit(updatedAccountInfo);
  };

  return (
    <Card>
      <CardHeader title="Edit Account Information" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
          <Button onClick={onCancel} variant="contained">
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

EditAccountForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default EditAccountForm;
