import "./App.css";
import Tooth from "./Tooth";
import Mooth from "./MTooth";
import MTooth from "./MTooth";
import DentalChart from "./DentalChart";
import DrawingCanvas from "./DrawingCanvas";
import ToothComponent from "./ToothComponent";

function App() {
  return (
    <div className="tt">
      <div className="App">
        <ToothComponent
          className="t1"
          expectedColor="#000000"
          expectedArea={1000}
        />
        {/* <DentalChart /> */}
      </div>
    </div>
  );
}

export default App;
