import React, { useContext } from 'react';
import { TreeContext }       from '../../context/TreeContext';
import Nodes                 from './Nodes';
import './Tree.scss';

const Tree = () => {
  const { tree, loading } = useContext(TreeContext);
  return (
    !loading && (
      <div id="wrapper">
        <div id="container">
          <Nodes
            tree={tree}
            nodesId={[tree.rootId]}
            className="organizational-chart"
          />
        </div>
      </div>
    )
  );
};

export default Tree;
