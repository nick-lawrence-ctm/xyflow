import { useState, MouseEvent, useCallback } from 'react';

import ReactFlow, {
  addEdge,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  FlowElement,
  Node,
  Edge,
  ElementChange,
  OnLoadParams,
  Connection,
} from 'react-flow-renderer';

const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, className: 'light' },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, className: 'light' },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, className: 'light' },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

const BasicFlow = () => {
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onConnect = useCallback((params: Edge | Connection, nds: Node[]) => {
    setEdges((eds) => addEdge(params, nds, eds));
  }, []);
  const onLoad = useCallback((reactFlowInstance: OnLoadParams) => setRfInstance(reactFlowInstance), []);

  const updatePos = () => {
    setNodes((nds) => {
      return nds.map((n) => {
        n.position = {
          x: Math.random() * 400,
          y: Math.random() * 400,
        };

        return n;
      });
    });
  };

  const logToObject = () => console.log(rfInstance?.toObject());
  const resetTransform = () => rfInstance?.setTransform({ x: 0, y: 0, zoom: 1 });

  const toggleClassnames = () => {
    setNodes((nds) => {
      return nds.map((n) => {
        n.className = n.className === 'light' ? 'dark' : 'light';

        return n;
      });
    });
  };

  const onNodesChange = useCallback((changes: ElementChange[]) => {
    setNodes((ns) => applyNodeChanges(changes, ns));
  }, []);

  const onEdgesChange = useCallback((changes: ElementChange[]) => {
    setEdges((es) => applyEdgeChanges(changes, es));
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onLoad={onLoad}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onElementClick={onElementClick}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      className="react-flow-basic-example"
      defaultZoom={1.5}
      minZoom={0.2}
      maxZoom={4}
    >
      <MiniMap />
      <Controls />
      <Background />

      <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 4 }}>
        <button onClick={resetTransform} style={{ marginRight: 5 }}>
          reset transform
        </button>
        <button onClick={updatePos} style={{ marginRight: 5 }}>
          change pos
        </button>
        <button onClick={toggleClassnames} style={{ marginRight: 5 }}>
          toggle classnames
        </button>
        <button onClick={logToObject}>toObject</button>
      </div>
    </ReactFlow>
  );
};

export default BasicFlow;
