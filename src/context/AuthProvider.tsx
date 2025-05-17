import { StudyTask } from '@/types';
import { createContext, useState, useContext } from 'react';

interface IAuthContext {
  tasks: StudyTask[];
  setTasks?: React.Dispatch<React.SetStateAction<StudyTask[]>>;
}

const AuthContext = createContext<IAuthContext>({
  tasks: [],
});

export const AuthProvider = ({ children }) => {
  const [tasks, setTasks] = useState();

  return (
    <AuthContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AuthContext.Provider>
  );
};

// Optional helper to consume the context
export const useAuth = () => useContext(AuthContext);
