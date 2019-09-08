import React, { useContext } from 'react';
import { TreeContext }       from '../../context/TreeContext';
import Avatar                from '../Avatar';
import ToggleButton          from '../ToggleButton';
import classNames            from 'classnames';

const getNodesArray = (idArr, tree) => {
  return idArr.map(id => tree[id]);
};

const Nodes = ({ nodesId, tree, className }) => {
  const { toggleChildren, highlight, unHighlight } = useContext(TreeContext);
  // Based on ids, get actual nodes array
  const nodes = getNodesArray(nodesId, tree);

  return (
    <ol className={className}>
      {nodes.map(({ node, children, collapsed, expanded, highlighted }) => (
        <li key={node.id}>
          <div
            id={node.id}
            className={classNames({ highlight: highlighted, pointer: children.length > 0 })}
            onMouseEnter={highlight}
            onMouseLeave={unHighlight}
            onClick={() => toggleChildren(node.id)}
          >
            <Avatar name={node.first} />
            {node.first} {node.last}
            {expanded ? (
              children.length > 0 && <ToggleButton expanded={true} />
            ) : (
              children.length > 0 && <ToggleButton expanded={false} />
            )}
          </div>
          {expanded && children.length > 0 && !collapsed && <Nodes nodesId={children} tree={tree} />}
        </li>
      ))}
    </ol>
  );
};

export default Nodes;