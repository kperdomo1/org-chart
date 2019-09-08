import React            from 'react';
import Tree             from './component/Tree';
import { TreeProvider } from './context/TreeContext';
import './App.scss';

const App = () => (
  <TreeProvider>
    <header className="app-header">
      <a className="logo" target="_blank" href="https://www.glide.com/" />
    </header>
    <h1 className="title">Big Corp Chart</h1>
    <Tree />
  </TreeProvider>
);

export default App;
