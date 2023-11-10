import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation'; // corrected from 'next/navigation' to 'next/router'
import { User } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar'; // Assuming you're using Material-UI for Snackbar

type DeleteButtonProps = {
  eventId: string;
  onDeleteSuccess: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ eventId, onDeleteSuccess }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this event?');
    if (confirmation) {
      try {
        const response = await axios.delete(`http://127.0.0.1:5000/events/${eventId.$oid}`);
        console.log(response.data.message); // Or handle the success response appropriately
        setIsDeleted(true);
        setSnackbarOpen(true); // Open the snackbar
        onDeleteSuccess();

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('There was an error deleting the event:', error.response?.data || error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return user ? (
    <>
      {!isDeleted ? (
        <button onClick={handleDelete}>Delete Event</button>
      ) : (
        <button onClick={() => router.push('/')}>Go to Home</button>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Event deleted successfully"
      />
    </>
  ) : null;
};

export default DeleteButton;
