import './index.css'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import RoutesComponent from './routes';
import { AuthProvider } from "../src/pages/AuthContex";
function App() {
  return (
    <AuthProvider>
    <PrimeReactProvider>
      <RoutesComponent /> 
    </PrimeReactProvider>
    </AuthProvider>
  );
}

export default App;