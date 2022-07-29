import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./App.css";
import earthTexture from "./assets/textures/earth.jpg";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const CAMERA_FOV = 50;
const [CAMERA_START_DISTANCE, CAMERA_END_DISTANCE] = [0.1, 1000];

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// カメラを作成
const camera = new THREE.PerspectiveCamera(
  CAMERA_FOV,
  window.innerWidth / window.innerHeight,
  CAMERA_START_DISTANCE,
  CAMERA_END_DISTANCE
);
camera.position.set(0, 0, 500);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

/** アプリケーションのルートコンポーネント */
const App = () => {
  const divRef = useRef<HTMLDivElement>(null);

  /** ブラウザのリサイズ時の処理 */
  const handleOnResizeEvent = () => {
    // レンダラーのリサイズ
    renderer.setSize(window.innerWidth, window.innerHeight);

    // カメラのアスペクト比を直す
    // https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    return;
  };

  useEffect(() => {
    window.addEventListener("resize", handleOnResizeEvent);

    divRef.current?.appendChild(renderer.domElement);

    // シーンを作成
    const scene = new THREE.Scene();

    // ジオメトリを作成
    const geometry = new THREE.SphereGeometry(100, 64, 32);

    // テクスチャ
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(earthTexture);

    // マテリアルを作成
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
    });

    // メッシュ化
    const mesh = new THREE.Mesh(geometry, material);

    // シーンにメッシュを追加
    scene.add(mesh);

    // 平衡光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // ポイント光源
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    // ポイント光源の場所を示す
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
    scene.add(pointLightHelper);

    // マウス操作を設定
    const controls = new OrbitControls(camera, renderer.domElement);

    const tick = () => {
      // ポイント光源を球の周りを巡回させる
      pointLight.position.set(
        200 * Math.sin(Date.now() / 500),
        200 * Math.sin(Date.now() / 1000),
        200 * Math.cos(Date.now() / 500)
      );

      controls.update();

      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      divRef.current?.removeChild(renderer.domElement);
      removeEventListener("resize", handleOnResizeEvent);
    };
  }, []);

  return (
    <div className="App">
      <div className="scene" ref={divRef}></div>
    </div>
  );
};

export default App;
