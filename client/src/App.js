import { Typography } from "@mui/material";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Typography
        style={{ textAlign: "center", color: "#800080" }}
        variant="h3"
      >
        Todo App
      </Typography>
      <Home />
    </div>
  );
}

export default App;
