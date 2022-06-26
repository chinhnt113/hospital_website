import './components/all.css';
import './components/index.css';
import { MainHeader } from './components/header';
import { MainNavbar} from './components/navbar';
import { MainSlider} from './components/slider';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <MainNavbar />
      <MainSlider />
    </div>
  );
}

export default App;
