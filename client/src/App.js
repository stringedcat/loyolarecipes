import "./App.css";
import { Route, Router, Switch } from "react-router";
import Home from "./components/Home/Home";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import Navbar from "./components/Navbar/Navbar";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import Landing from "./components/Landing/Landing";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" exact component={Landing} />
        <Route exact path="/home" exact component={Home} />
        <Route path="/create-recipe" component={RecipeForm} />
        <Route path={"/recipe/:id"} exact component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
