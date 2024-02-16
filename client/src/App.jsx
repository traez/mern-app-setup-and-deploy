import {
  Heading,
  Center,
  Button,
  Box,
  Input,
  FormControl as Form,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [refresh, setRefresh] = useState(false);

  const getTodos = () => {
    fetch("/api/getAllTodos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (refresh) {
      getTodos();

      setTimeout(() => {
        setRefresh(false);
      });
    }
  }, [refresh]);

  const deleteTodo = (todoId) => () => {
    fetch("/api/deleteTodo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId }),
    }).then(() => setRefresh(true));
  };

  const addTodo = (e) => {
    e.preventDefault();
    fetch("/api/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: inputVal }),
    }).then(() => {
      setRefresh(true);
      setInputVal("");
    });
  };

  return (
    <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
      <Heading mb={12}>MERN</Heading>

      <Form mb={10} as="form" onSubmit={addTodo}>
        <Input
          onChange={(e) => setInputVal(e.target.value)}
          width="300px"
          placeholder="New Todo"
          size="md"
          value={inputVal}
        />
        <Button type="submit">Add</Button>
      </Form>

      {todos.map(({ _id, title }) => (
        <Box key={_id} mb={10} display="flex" justifyContent="space-between">
          <Center w="180px" h="80px" bg="red.200">
            {title}
          </Center>
          <Button onClick={deleteTodo(_id)}>Delete</Button>
        </Box>
      ))}
    </div>
  );
};

export default App;
