import {
  Button,
  TextField,
  Card,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonGroup,
  ButtonBase,
  Popover,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CompletedIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";

const Home = () => {
  const [showState, setShowState] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [filtered, setFiltered] = useState([]);
  const [tasks, setTask] = useState([]);
  const [editId, setEditId] = useState([]);
  const [state, setState] = useState({
    name: "",
    description: "",
    editName: "",
    editDescription: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  useEffect(() => {
    try {
      fetch("http://localhost:8080/tasks").then((res) => {
        res.json().then((data) => {
          setTask([...data]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    switch (showState) {
      case "all":
        setFiltered([...tasks]);
        break;
      case "active":
        setFiltered([...tasks.filter((todo) => !todo.completed)]);
        break;
      case "completed":
        setFiltered([...tasks.filter((todo) => todo.completed)]);
        break;
      default:
        break;
    }
  }, [showState, tasks]);

  return (
    <Card variant="outlined" style={styles.card}>
      <TextField
        style={{ margin: 8, width: "25%" }}
        label="Task name"
        color="secondary"
        fullWidth
        focused
        name="name"
        value={state.name}
        onChange={handleChange}
      />
      <TextField
        style={{ margin: 8, width: "40%" }}
        label="Task description"
        color="secondary"
        fullWidth
        multiline
        focused
        rows={3}
        name="description"
        value={state.description}
        onChange={handleChange}
      />
      <Button
        color="secondary"
        variant="contained"
        style={{ margin: 8 }}
        onClick={() => {
          try {
            fetch("http://localhost:8080/addTask", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: state.name,
                description: state.description,
                completed: false,
              }),
            }).then((res) => {
              res.json().then((data) => {
                setTask([...tasks, data]);
              });
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        ADD TASK
      </Button>
      <ButtonGroup
        style={{ margin: 8 }}
        color="secondary"
        variant="outlined"
        aria-label="outlined button group"
      >
        <Button
          variant={showState === "all" ? "contained" : "outlined"}
          onClick={() => setShowState("all")}
        >
          All
        </Button>
        <Button
          variant={showState === "active" ? "contained" : "outlined"}
          onClick={() => setShowState("active")}
        >
          Active
        </Button>
        <Button
          variant={showState === "completed" ? "contained" : "outlined"}
          onClick={() => setShowState("completed")}
        >
          completed
        </Button>
      </ButtonGroup>
      <div style={{ margin: 8, width: "40%" }}>
        {filtered.map((todo) => (
          <div>
            <Accordion expanded>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography color="secondary">{todo.name}</Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{todo.description}</Typography>
                <div>
                  <ButtonBase
                    style={{ padding: 8 }}
                    onClick={(event) => {
                      setEditId(todo._id);
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    <EditIcon color="secondary" fontSize="small" />
                  </ButtonBase>
                  <ButtonBase
                    style={{ padding: 8 }}
                    onClick={() => {
                      try {
                        fetch(`http://localhost:8080/tasks/${todo._id}`, {
                          method: "DELETE",
                        }).then((res) => {
                          if (res.status === 200) {
                            const index = tasks.findIndex(
                              (task) => todo._id === task._id
                            );
                            if (index > -1) {
                              const temp = [...tasks];
                              temp.splice(index, 1);
                              setTask([...temp]);
                            }
                          }
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    <DeleteIcon color="secondary" fontSize="small" />
                  </ButtonBase>
                  {!todo.completed && (
                    <ButtonBase
                      style={{ padding: 8 }}
                      onClick={() => {
                        try {
                          fetch(`http://localhost:8080/tasks/${todo._id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              completed: true,
                            }),
                          }).then((res) => {
                            res.json().then((data) => {
                              const index = tasks.findIndex(
                                (task) => todo._id === task._id
                              );
                              if (index > -1) {
                                const temp = [...tasks];
                                temp[index] = data;
                                setTask([...temp]);
                              }
                            });
                          });
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      <CompletedIcon color="secondary" fontSize="small" />
                    </ButtonBase>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
      <Popover
        anchorEl={anchorEl}
        open={open}
        id={open ? "simple-popover" : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        <div style={{ padding: 24 }}>
          <TextField
            style={{ margin: 8, width: "30%" }}
            label="Task name"
            color="secondary"
            fullWidth
            focused
            name="editName"
            value={state.editName}
            onChange={handleChange}
          />
          <TextField
            style={{ margin: 8, width: "40%" }}
            label="Task description"
            color="secondary"
            fullWidth
            multiline
            focused
            rows={3}
            name="editDescription"
            value={state.editDescription}
            onChange={handleChange}
          />
          <Button
            color="secondary"
            variant="contained"
            style={{ margin: 8 }}
            onClick={() => {
              try {
                fetch(`http://localhost:8080/tasks/${editId}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: state.editName,
                    description: state.editDescription,
                  }),
                }).then((res) => {
                  res.json().then((data) => {
                    const index = tasks.findIndex(
                      (task) => editId === task._id
                    );
                    if (index > -1) {
                      const temp = [...tasks];
                      temp[index] = data;

                      setTask([...temp]);
                      setAnchorEl(null);
                    }
                  });
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            EDIT TASK
          </Button>
        </div>
      </Popover>
    </Card>
  );
};

export default Home;

var styles = {
  card: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 24,
  },
};
