import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import Signup from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { JSX } from 'react';
  
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  return (
    <Routes>
      <Route path="/login" element={ <Login />} />
      <Route path="/signup" element={ <Signup />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App
