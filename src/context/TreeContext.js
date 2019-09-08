import React                from 'react';
import { getChildrenNodes } from '../apiService';

const initialData = {
  tree: {},
  loading: true
};

export const TreeContext = React.createContext(initialData);

export class TreeProvider extends React.Component {
  state = initialData;

  async componentDidMount() {
    // First, fetch tree root
    const tree = {};
    const root = await getChildrenNodes().then(r => r[0]);
    tree.rootId = root.id;
    tree[root.id] = { node: root, children: [], expanded: true, preFetched: true };
    // Then, fetch root children and render partially constructed tree.
    await this.fetchChildren([root.id], { tree }, () => {
      // After that, pre-fetch root children's children but keep 'em collapsed
      const { tree } = this.state;
      this.fetchChildren(tree[root.id].children);
    });
  }

  /**
   * Fetches a specific node's (collapsed) children
   * @param nodesIds - children ids array
   * @param state - optional (probably updated) state object
   * @param callback - optional callback to execute once state is updated with fetched children
   * @returns {Promise<void>}
   */
  fetchChildren = async (nodesIds = [], state, callback) => {
    const { tree } = state || this.state;
    for (const nodeId of nodesIds) {
      const children = await getChildrenNodes(nodeId);
      children.forEach(child => {
        tree[child.id] = { node: child, children: [], expanded: false, preFetched: false };
        // Add child to it's parent
        tree[nodeId].children.push(child.id);
      });
    }
    console.log('tree', tree);
    this.setState({ tree, loading: false }, callback);
  };

  toggleChildren = (nodeId) => {
    console.log('nodeId', nodeId);
    const { tree } = this.state;
    tree[nodeId].expanded = !tree[nodeId].expanded;
    // If user expanded node's children, see if we must fetch their children
    if (tree[nodeId].expanded && !tree[nodeId].preFetched) {
      this.fetchChildren(tree[nodeId].children);
    }
    tree[nodeId].preFetched = true;
    this.setState({ tree });
  };

  render() {
    const { state, fetchChildren, toggleChildren } = this;
    const store = { ...state, fetchChildren, toggleChildren };
    return (
      <TreeContext.Provider value={store}>
        { this.props.children }
      </TreeContext.Provider>
    );
  }
}