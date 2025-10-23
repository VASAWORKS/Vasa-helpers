import './App.css';
import { Rive } from './components/Rive';

function App() {
  return (
    <>
      <div style={{
        width: '20rem',
        height: '20rem',
      }}>
        <Rive src='https://cdn.rive.app/animations/vehicles.riv' stateMachine='bumpy' autoPlay={true} startOnView={true} fit='Cover' />
      </div>
    </>
  );
}

export default App;
