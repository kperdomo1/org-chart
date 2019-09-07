import React                from 'react';
import { getChildrenNodes } from './apiService';
import Tree                 from './component/Tree';
import './App.css';

class App extends React.Component {
  state = {
    tree: {},
    loading: true
  };

  async componentDidMount() {
    // Fetch root
    const tree = {};
    const root = await getChildrenNodes().then(r => r[0]);
    let level1 = [];
    if (root) {
      tree.root = { node: root, children: [] };
      // Fetch first tree level
      level1 = await getChildrenNodes(root.id);
      level1.forEach(node => {
        tree[node.id] = { node, children: [] };
        tree.root.children.push(node.id);
      });
    }
    // Go ahead and render
    this.setState({ tree, loading: false });
  }

  render() {
    const { tree, loading } = this.state;
    const { root } = tree;
    return (
      !loading && (
        <div id="wrapper">
          <div id="container">
            <ol className="organizational-chart">
              <li>
                <div>
                  {root.node.first} {root.node.last}
                </div>
                <Tree tree={tree} nodesId={root.children} />
              </li>
            </ol>
          </div>
        </div>
     ));
  }
}

export default App;
