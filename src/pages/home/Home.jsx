import { Button, MenuItem, TextField } from "@material-ui/core";
import "./home.css";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import Categories from "../../data/Categories";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
const Home = ({name,setName,fetchQuestions}) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const handleClick = () => {
 
        if(!category || !difficulty || !name){
            setError(true);
            return;
        }
        else {
            setError(false)
            fetchQuestions(category,difficulty);
            navigate('/quiz')
        }
    }
    return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
        <div className="settings__select">
        {error && <ErrorMessage>Plz fill all options</ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Name"
            variant="outlined"
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((item) => (
              <MenuItem key={item.category} value={item.value}>
                {item.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select difficulty"
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(e)=>setDifficulty(e.target.value)}
            value={difficulty}

          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Difficult" value="difficult">
              Difficult
            </MenuItem>
          </TextField>
          <Button variant="contained" color="secondary" size="large" onClick={handleClick}>
            Start Quiz
          </Button>
        </div>
      </div>

      <img src="/quizz.png" className="banner" alt="im" />
    </div>
  );
};

export default Home;
