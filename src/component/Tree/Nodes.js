import React, { useContext } from 'react';
import { TreeContext }       from '../../context/TreeContext';

const getNodesArray = (idArr, tree) => {
  return idArr.map(id => tree[id]);
};

const Nodes = ({ nodesId, tree, className }) => {
  const { toggleChildren } = useContext(TreeContext);
  // Based on ids, get actual nodes array
  const nodes = getNodesArray(nodesId, tree);

  return (
    <ol className={className}>
      {nodes.map(({ node, children, collapsed, expanded }) => (
        <li key={node.id}>
          <div onClick={() => toggleChildren(node.id)}>
            {node.first} {node.last}
            {expanded ? (
              children.length > 0 && ' (-)'
            ) : (
              children.length > 0 && ' (+)'
            )}
          </div>
          {expanded && children.length > 0 && !collapsed && <Nodes nodesId={children} tree={tree} />}
        </li>
      ))}
    </ol>
  );
};

export default Nodes;