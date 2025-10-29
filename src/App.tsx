import './App.css';
import { Rive } from './components/Rive';

function App() {
  return (
    <>
      <div
        style={{
          width: '20rem',
          height: '20rem',
        }}
      >
        <Rive
          src='https://cdn.prod.website-files.com/68ed18479f22b774d52cd844/68f63a9a11f1427d3a72d8cb_cd8eecd2f2d1b3bc59f34889c3cb33d4_soltuion_1_hero.riv'
          stateMachine='State Machine 1'
          fontSource='https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf'
          autoPlay={true}
          startOnView={false}
          fit='Cover'
        />
      </div>
    </>
  );
}

export default App;
