(async function () {
    var firstNames = [
        "Mary",
        "Patricia",
        "Jennifer",
        "Linda",
        "Elizabeth",
        "Barbara",
        "Susan",
        "Jessica",
        "Sarah",
        "Karen",
        "Lisa",
        "Nancy",
        "Betty",
        "Margaret",
        "Sandra",
        "Ashley",
        "Kimberly",
        "Emily",
        "Donna",
        "Michelle",
        "Carol",
        "Amanda",
        "Dorothy",
        "Melissa",
        "Deborah",
        "Stephanie",
        "Rebecca",
        "Sharon",
        "Laura",
        "Cynthia",
        "Kathleen",
        "Amy",
        "Angela",
        "Shirley",
        "Anna",
        "Brenda",
        "Pamela",
        "Emma",
        "Nicole",
        "Helen",
        "Samantha",
        "Katherine",
        "Christine",
        "Debra",
        "Rachel",
        "Carolyn",
        "Janet",
        "Catherine",
        "Maria",
        "Heather",
        "Diane",
        "Ruth",
        "Julie",
        "Olivia",
        "Joyce",
        "Virginia",
        "Victoria",
        "Kelly",
        "Lauren",
        "Christina",
        "Joan",
        "Evelyn",
        "Judith",
        "Megan",
        "Andrea",
        "Cheryl",
        "Hannah",
        "Jacqueline",
        "Martha",
        "Gloria",
        "Teresa",
        "Ann",
        "Sara",
        "Madison",
        "Frances",
        "Kathryn",
        "Janice",
        "Jean",
        "Abigail",
        "Alice",
        "Julia",
        "Judy",
        "Sophia",
        "Grace",
        "Denise",
        "Amber",
        "Doris",
        "Marilyn",
        "Danielle",
        "Beverly",
        "Isabella",
        "Theresa",
        "Diana",
        "Natalie",
        "Brittany",
        "Charlotte",
        "Marie",
        "Kayla",
        "Alexis",
        "Lori"
      ];
    var lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Garcia",
        "Miller",
        "Davis",
        "Rodriguez",
        "Martinez",
        "Hernandez",
        "Lopez",
        "Gonzales",
        "Wilson",
        "Anderson",
        "Thomas",
        "Taylor",
        "Moore",
        "Jackson",
        "Martin",
        "Lee",
        "Perez",
        "Thompson",
        "White",
        "Harris",
        "Sanchez",
        "Clark",
        "Ramirez",
        "Lewis",
        "Robinson",
        "Walker",
        "Young",
        "Allen",
        "King",
        "Wright",
        "Scott",
        "Torres",
        "Nguyen",
        "Hill",
        "Flores",
        "Green",
        "Adams",
        "Nelson",
        "Baker",
        "Hall",
        "Rivera",
        "Campbell",
        "Mitchell",
        "Carter",
        "Roberts",
        "Gomez",
        "Phillips",
        "Evans",
        "Turner",
        "Diaz",
        "Parker",
        "Cruz",
        "Edwards",
        "Collins",
        "Reyes",
        "Stewart",
        "Morris",
        "Morales",
        "Murphy",
        "Cook",
        "Rogers",
        "Gutierrez",
        "Ortiz",
        "Morgan",
        "Cooper",
        "Peterson",
        "Bailey",
        "Reed",
        "Kelly",
        "Howard",
        "Ramos",
        "Kim",
        "Cox",
        "Ward",
        "Richardson",
        "Watson",
        "Brooks",
        "Chavez",
        "Wood",
        "James",
        "Bennet",
        "Gray",
        "Mendoza",
        "Ruiz",
        "Hughes",
        "Price",
        "Alvarez",
        "Castillo",
        "Sanders",
        "Patel",
        "Myers",
        "Long",
        "Ross",
        "Foster",
        "Jimenez"
      ];
    
    var getRandomFromArray = function (array) {
        return array[Math.floor(Math.random()*array.length)];
    }
    
    var getRandomName = function () {
        return getRandomFromArray(firstNames) + " " + getRandomFromArray(lastNames);
    }

    var usernames = [
        'MarmadileManteater',
        'MarMar Dilem Anteater',
        'Marmalade Crocodile Anteater'
    ];

    let username = getRandomFromArray(usernames);
    document.getElementById('variation-name').innerHTML = username;

    document.getElementById('name').innerHTML = getRandomName();

    document.getElementById('face-image').src = "https://thispersondoesnotexist.com/image";
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