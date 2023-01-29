import './App.css';
import AddName from './components/AddName'


 function App() {
  return (
    <div className="App">
          <div id="head">
            <h2>Add new patient</h2>
          </div>
        <div>
        <AddName/>
        </div>
    </div>
  );
}

export default App;
