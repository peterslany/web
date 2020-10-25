import * as THREE from "three";
import * as POSTPROCESSING from "postprocessing";

import smoke from "../assets/images/smoke.png";
import stars from "../assets/images/stars.jpg"



export const startBG = () => {
    let scene, camera, cloudParticles = [],composer, renderer;

      function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
        camera.position.z = 1.1;
        camera.rotation.x = 1.16;
        camera.rotation.y = -0.12;
        camera.rotation.z = 0.27;

        let ambient = new THREE.AmbientLight(0xff5555);
        scene.add(ambient);


        let orangeLight = new THREE.PointLight(0xcc6600,50,450,1.7);
        orangeLight.position.set(500,300,100);
        scene.add(orangeLight);
        let redLight = new THREE.PointLight(0x118547e,50,450,1.7);
        redLight.position.set(0,200,100);
        scene.add(redLight);
        let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
        blueLight.position.set(300,0,200);
        scene.add(blueLight);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        scene.fog = new THREE.FogExp2(0x999fba, 0.001);
        renderer.setClearColor(scene.fog.color);
        renderer.domElement.setAttribute("id", "bg-canvas")
        document.getElementById("bg").appendChild(renderer.domElement);

        let loader = new THREE.TextureLoader();
        loader.load(smoke, function(texture){
          let cloudGeo = new THREE.PlaneBufferGeometry(500,500);
          let cloudMaterial = new THREE.MeshLambertMaterial({
            map:texture,
            transparent: true
          });

          for(let p=0; p<50; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
              Math.random()*800 -400,
              222,
              Math.random()*500-500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*2*Math.PI;
            cloud.material.opacity = 0.25;
            cloudParticles.push(cloud);
            scene.add(cloud);
          }
        });
        loader.load(stars, function(texture){

          const textureEffect = new POSTPROCESSING.TextureEffect({
            blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
            texture: texture
          });
          textureEffect.blendMode.opacity.value = 0;

          const bloomEffect = new POSTPROCESSING.BloomEffect({
                blendFunction: POSTPROCESSING.BlendFunction.SCREEN,
                kernelSize: POSTPROCESSING.KernelSize.SMALL,
                useLuminanceFilter: true,
                luminanceThreshold: .075,
                luminanceSmoothing: 0.75
              });
          bloomEffect.blendMode.opacity.value = 1.5;

          let effectPass = new POSTPROCESSING.EffectPass(
            camera,
            bloomEffect,
            textureEffect
          );
          effectPass.renderToScreen = true;

          composer = new POSTPROCESSING.EffectComposer(renderer);
          composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
          composer.addPass(effectPass);
          
          window.addEventListener("resize", onWindowResize, false);
          render();
        });
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      function render() {
        cloudParticles.forEach(p => {
          p.rotation.z -=0.0025;
        });
        composer.render(0.1);
        requestAnimationFrame(render);
      }
      
      init();
};
