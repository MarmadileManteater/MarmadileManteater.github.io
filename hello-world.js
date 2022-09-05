(async function () {

    
    var getRandomFromArray = function (array) {
        return array[Math.floor(Math.random()*array.length)];
    }

    var usernames = [
        'MarmadileManteater',
        'MarMar Dilem Anteater',
        'Marmalade Crocodile Anteater'
    ];

    let username = getRandomFromArray(usernames);
    document.getElementById('variation-name').innerHTML = username;

    // This is roughly based on https://github.com/thegiffactory/3d-text-gif-generator
    var width = 1200;
    var height = 200;
    let renderer
    var createText = function(font, color, displayText) {
      var text = new THREE.TextGeometry(displayText, {
        font: font,
        size: 260,
        height: 20,
        curveSegments: 12
      })
      text.computeBoundingBox();
      var centerOffset = -0.5 * (text.boundingBox.max.x - text.boundingBox.min.x);
    
      var material = new THREE.MeshPhongMaterial({ color: color, flatShading: true });
      var textMesh = new THREE.Mesh(text, material);
      textMesh.position.x = centerOffset;
    
      var group = new THREE.Group();
      group.add(textMesh);
      group.position.y = 100;
      return group;
    }
    
    var createCamera = function() {
      var cameraTarget = new THREE.Vector3(0, 150, 0);
      var camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1500);
      camera.position.set(-500, 200, 700);
      camera.lookAt(cameraTarget);
      return camera;
    }
    
    var createDirectionalLight = function() {
      var light = new THREE.DirectionalLight(0xffffff, 0.125);
      light.position.set(0, 0, 1).normalize();
      return light;
    }
    
    var createPointLight = function() {
      var light = new THREE.PointLight(0xffffff, 1.5);
      light.position.set(0, 200, 700);
      return light;
    }
    
    var init = function(hexColor, jsonFontUri, inputText) {
      var scene = new THREE.Scene();
      var text = null;
    
      var loader = new THREE.FontLoader();
      var canvas = document.getElementById('3dcanvas');
    
      renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true, antialias: true ,canvas: canvas, alpha: true });
      renderer.setClearColor( 0x000000, 0 );
      renderer.setSize(width, height);
    
      loader.load(jsonFontUri, function (font) {
        text = createText(font, 0xB22222, '')
        scene.add(text);
    
        var dirLight = createDirectionalLight();
        scene.add(dirLight);
        var pointLight = createPointLight();
        scene.add(pointLight);
    
        var color = parseInt(hexColor, 16);

        text = createText(font, color, inputText)
        scene.add(text);
        renderer.render(scene, camera)
        text.rotateY(-Math.PI/5)
        setInterval(function () {
          renderer.render(scene, camera);
        }, 33)
      });
      var camera = createCamera();
      var render = function() {
        renderer.render(scene, camera);
      }
      animate(render);
    }
    
    var animate = function (render) {
      requestAnimationFrame(animate.bind(null, render));
      render();
    };
    init("FFFFFF", "fonts/droid_sans_regular.typeface.json", username);
    const resize = function () {
        if (window.innerWidth < 1200) {
            renderer.setSize(window.innerWidth, window.innerWidth * (height/width));
        } else {
            renderer.setSize(width, height);
        }
    }
    window.addEventListener('resize', resize)
    resize()
}())