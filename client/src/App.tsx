import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import Login from './pages/Login';
import EquipmentList from './pages/EquipmentList';
import KanbanBoard from './pages/RequestsKanban';

import CalendarView from './pages/CalendarView';
import Dashboard from './pages/Dashboard';

// Placeholder for Dashboard
// const Dashboard = () => <div>Dashboard Content</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/requests" element={<KanbanBoard />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
