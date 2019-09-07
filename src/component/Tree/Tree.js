import React from 'react';

const getNodesArray = (idArr, tree) => {
  return idArr.map(id => tree[id]);
};

const Tree = ({ nodesId, tree }) => {
  // Based on ids, get actual nodes array
  const nodes = getNodesArray(nodesId, tree);
  console.log('nodes', nodes);
  return (
    <ol>
      {nodes.map(({ node, children, collapsed }) => (
        <li key={node.id}>
          <div>
            {node.first} {node.last}
          </div>
          {children.length > 0 && !collapsed && <Tree nodesId={children} tree={tree} />}
        </li>
      ))}
    </ol>
  );
};

export default Tree;
