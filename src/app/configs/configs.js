//var getUrl = window.location;
const configs = {  
    //'BASE_URL': getUrl.origin,
    'BASE_URL': '/',
    'SIMULATOR_SOCKET_IO_TEST_URL': 'http://localhost:5000',
    'UPLOAD_URL':'http://172.16.23.28',
    'HEATMAP_GRAPH_CONFIG': {
      layout: {
        hierarchical: true
      },
      edges: {
        width: 4,
        arrows: {
          to:     {enabled: false, scaleFactor:1, type:'arrow'},
          middle: {enabled: false, scaleFactor:1, type:'arrow'},
          from:   {enabled: false, scaleFactor:1, type:'arrow'}
        },
      },
      nodes: {
        borderWidth: 1,
        borderWidthSelected: 1,
        brokenImage:undefined,
        chosen: true,
        fixed: {
          x:false,
          y:false
        },
        font: {
          color: '#343434',
          size: 15,
          face: 'arial',
          align: 'center',
        },
        shadow:{
          enabled: true,
        },
        shape: 'circle',
        shapeProperties: {
          borderDashes: false,
        },
        widthConstraint: {
            minimum: 90,
            maximum: 90
        },
      },
      physics: {
          enabled: true,
          barnesHut: {
              gravitationalConstant: -1000,
              centralGravity: 2.0,
              springLength: 120,
              springConstant: 0.5,
              damping: 6.5,
              avoidOverlap: 1
          },
          maxVelocity: 50,
          minVelocity: 0.1,
          solver: 'barnesHut',
          stabilization: {
              enabled: true,
              iterations: 100,
              updateInterval: 10,
              onlyDynamicEdges: true,
              fit: true
          },
      },
      interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        tooltipDelay: 300,
        zoomView: true
      }
  }
}
export default configs; 