import './index.css'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import RoutesComponent from './routes';

function App() {
  return (
    <PrimeReactProvider>
      <RoutesComponent /> 
    </PrimeReactProvider>
  );
}

export default App;