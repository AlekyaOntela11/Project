import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Color3,
  
  StandardMaterial
} from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { Shape } from "../types/Shape";

interface Props {
  shape: Shape;
}

function BabylonViewer({ shape }: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const meshRef = useRef<any>(null);

  // INIT ONLY ONCE
  useEffect(() => {

    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;

    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      8,
      Vector3.Zero(),
      scene
    );

    camera.attachControl(canvasRef.current, true);

    new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };

  }, []);

  // UPDATE SHAPE ONLY (no engine restart)
  useEffect(() => {

    const scene = sceneRef.current;
    if (!scene) return;

    if (meshRef.current) {
      meshRef.current.dispose();
    }

    const size = shape.size || 2;

    switch (shape.shape) {

      case "Box":
        meshRef.current = BABYLON.MeshBuilder.CreateBox("box", { size }, scene);
        break;

      case "Sphere":
        meshRef.current = BABYLON.MeshBuilder.CreateSphere("sphere", {
          diameter: size
        }, scene);
        break;

      case "Cylinder":
        meshRef.current = BABYLON.MeshBuilder.CreateCylinder("cyl", {
          height: size,
          diameter: size / 1.5
        }, scene);
        break;
       case "Cone":
        meshRef.current = BABYLON.MeshBuilder.CreateCylinder("cone", {
          height: size,
          diameterTop: 0,
          diameterBottom: size / 1
        }, scene);
        break;
  case "Torus":
  meshRef.current = BABYLON.MeshBuilder.CreateTorus("torus", {
    diameter: size,
    thickness: size / 3
  }, scene);
  break;
  case "Disc":
  meshRef.current = BABYLON.MeshBuilder.CreateDisc("disc", {
    radius: size / 2
  }, scene);
  break;


    }

    if (meshRef.current) {

      const mat = new StandardMaterial("mat", scene);

      switch (shape.color) {

        case "Red":
          mat.diffuseColor = new Color3(1, 0, 0);
          break;

        case "Green":
          mat.diffuseColor = new Color3(0, 1, 0);
          break;

        case "Blue":
          mat.diffuseColor = new Color3(0, 0, 1);
          break;
        case "Pink":
            mat.diffuseColor = new Color3(1, 0.75, 0.8);
            break;
      }

      meshRef.current.material = mat;

    }

  }, [shape]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "400px",
        border: "1px solid #ddd",
        marginTop: 20,
        borderRadius: 8
      }}
    />
  );

}
export default BabylonViewer;