import React            from 'react';
import Tree             from './component/Tree';
import { TreeProvider } from './context/TreeContext';
import './App.scss';

const App = () => (
  <TreeProvider>
    <Tree />
  </TreeProvider>
);

export default App;
