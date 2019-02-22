const canvasSketch = require('canvas-sketch');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(20, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, .09, .05 );
    const geometry = new THREE.CylinderGeometry( 0, 5.5, 5.5, 4, false )
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      vertexColors: 0xffffff,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

  // Add Wires
  const wireframe = new THREE.WireframeGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xf8f8ff,
    transparent: true,
    opacity: .3,
    depthTest: true,
  });
  const line = new THREE.Line( wireframe, lineMaterial );
  scene.add(line);

  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('lightblue'));

  // Add some light
  const light = new THREE.PointLight('lightblue', 1, 15.5);
  light.position.set(2, 2, -8).multiplyScalar(1.5);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render ({ time }) {
      cube.rotation.y = time * (10 * Math.PI / 180);
      line.rotation.y = time * (10 * Math.PI / 180);
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload () {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
