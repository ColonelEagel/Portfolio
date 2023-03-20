// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// const controls = new THREE.OrbitControls(camera, renderer.domElement);

// const animate = function ()
// {
//     requestAnimationFrame(animate);

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     controls.update();

//     renderer.render(scene, camera);
// };

// animate();
// Define the background colors for the waves
const background_waves_background_color = "#212121";
const background_waves_mesh_color = "#3B4246";

// Create a function to generate the waves background
function wavesBackground()
{
    // Set up the properties for the plane and waves
    const vertex_height = 15000;
    const plane_segments_size = 100;
    const plane_size = 1245000;
    const background_color = background_waves_background_color;
    const mesh_color = background_waves_mesh_color;

    // Get the container element and initialize variables
    const container = document.getElementById('main');
    const inital_Z = [];
    let count = 0;

    // Set up the camera and scene
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000);
    camera.position.z = 10000;
    let y = camera.position.y = 10000;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(background_color, 1, 300000);

    // Create the plane geometry and mesh
    const geometry = new THREE.PlaneGeometry(plane_size, plane_size, plane_segments_size, plane_segments_size);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: mesh_color,
        wireframe: true // Show wireframe
    }));
    mesh.rotation.x -= Math.PI * .5;
    scene.add(mesh);

    // Set up the renderer and add it to the container
    const renderer = new THREE.WebGLRenderer({
        alpha: false // Do not use alpha channel
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(background_color, 1);
    container.appendChild(renderer.domElement);

    // Update the geometry of the plane
    function updateGeometry()
    {
        for (let i = 0; i < geometry.attributes.position.count; i++)
        {
            const z = Math.random() * vertex_height - vertex_height;
            geometry.attributes.position.setZ(i, z);
            inital_Z[i] = z;
        }
    }
    updateGeometry();

    // Render the scene
    function render()
    {
        requestAnimationFrame(render);

        // Move the camera position
        let x = camera.position.x;
        let z = camera.position.z;
        x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
        z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
        camera.lookAt(new THREE.Vector3(0, 9000, 0));

        // Update the wave positions
        for (let i = 0; i < geometry.attributes.position.count; i++)
        {
            const next_z = Math.sin((i + count * 0.00002)) * (inital_Z[i] - (inital_Z[i] * 0.6));
            if (next_z !== next_z) return; // Skip if NaN
            geometry.attributes.position.setZ(i, next_z);
            geometry.attributes.position.needsUpdate = true;
            count += 0.075;
        }
        renderer.render(scene, camera);
    }
    render();
    // Define a function to update the camera position based on the current scroll position
    //  function updateCameraPosition() {
    //     // Initialize y to the current camera position
    //     let y = camera.position.y;

    //     // Calculate the new camera position based on the current scroll position
    //     y += window.scrollY;

    //     // Update the camera position
    //     camera.position.y = y;
    // }


    let prevScrollY = 0;


    function updateCameraPosition()
    {
        // Calculate the new camera position based on the current scroll position
        const deltaY = window.scrollY - prevScrollY;
        camera.position.y += deltaY * 10; // adjust the value to control the speed of the movement
        prevScrollY = window.scrollY;
    }

    // function updateCameraPosition()
    // {
    //     // Calculate the new camera position based on the current scroll position
    //     const scrollPosition = window.scrollY;
    //     const newY = 10000 - scrollPosition;
    //     camera.position.y = newY;
    // }
    // Update the camera position when the user scrolls
    window.addEventListener('scroll', updateCameraPosition);


    // Resize the renderer when the window size changes
    function resize()
    {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize, false);
}

// Call the function to generate the waves background
wavesBackground();

// var slogans = [
//     "Building better web experiences, one project at a time.",
//     "Code that transforms ideas into reality.",
//     "Developing digital solutions that make a difference.",
//     "Crafting web experiences that connect people.",
//     "Bringing your ideas to life through web development.",
//     "Designing websites that exceed expectations.",
//     "Your partner in web development success.",
//     "Delivering customized web solutions for your unique needs.",
//     "Expert web development for businesses of all sizes.",
//     "Empowering your brand with powerful web solutions."
// ];

// var options = {
//     strings: slogans,
//     typeSpeed: 60,
//     backSpeed: 40,
//     backDelay: 2000,
//     loop: true,
//     showCursor: true, // show the blinking cursor
//     cursorChar: '|', // set the cursor character to '|'
// };

// var typed = new Typed('#slogan', options);

const texts = [
    "Building better web experiences, one project at a time.",
    "Code that transforms ideas into reality.",
    "Developing digital solutions that make a difference.",
    "Crafting web experiences that connect people.",
    "Bringing your ideas to life through web development.",
    "Designing websites that exceed expectations.",
    "Your partner in web development success.",
    "Delivering customized web solutions for your unique needs.",
    "Expert web development for businesses of all sizes.",
    "Empowering your brand with powerful web solutions."
];

let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type()
{
    if (count === texts.length)
    {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('#text p').textContent = letter;
    if (letter.length === currentText.length)
    {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else
    {
        setTimeout(type, 90);
    }

}

type();
