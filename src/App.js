import { Fragment, useState } from 'react';

import Header from './components/Layout/Header';
import Countdowns from './components/Countdowns/Countdowns';
import "./App.css"
import Tasks from './components/Tasks/Tasks';
import NewTasks from './components/NewTasks/NewTasks';
import { TaskContextProvider } from './components/store/task-context';
function App() {
  const [background, setBackground] = useState("rgb(186, 73, 73)")
  const handlerBackground = (color) => {
    setBackground(color)
  }

  return (
    <TaskContextProvider>
      <div className='container' style={{ background }}>
        <Header />
        <main>
          <Countdowns setBackgroundColor={handlerBackground} />
          <Tasks />
          <NewTasks />
        </main>
      </div>
    </TaskContextProvider>
  );
}

export default App;
