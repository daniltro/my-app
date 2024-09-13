import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "../../services/store";
import { login } from "../../services/slices/authSlice";
import { RootState } from "../../services/store";
import { IUserData } from "../../types/types";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData: IUserData = { userName: username, password };
    try {
      await dispatch(login(userData)).unwrap();
    } catch (error) {
      setError("Ошибка авторизации");
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (auth.status === "succeeded" && auth.token) {
      localStorage.setItem("authToken", auth.token);
      console.log(
        "Token saved to localStorage:",
        localStorage.getItem("authToken")
      );
      navigate("/"); // Redirect to home page
    }
  }, [auth.status, auth.token, navigate]);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ pt: 5 }}
      >
        <Typography variant="h4" gutterBottom>
          Авторизация
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Логин"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              Войти
            </Button>
          </Box>
        </form>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};
