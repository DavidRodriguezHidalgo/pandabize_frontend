import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import "./App.css";
import "react-notifications/lib/notifications.css";
import Navbar from "./components/layout/Navbar";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <Router>
      <NotificationContainer />
      <Navbar title="Pandabize" />
      <div style={{ display: "flex" }}>
        <Routes />
      </div>
    </Router>
  );
}

export default App;
