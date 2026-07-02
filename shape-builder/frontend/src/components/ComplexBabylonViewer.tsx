import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import axios from "axios";

function ComplexBabylonViewer({ id }: { id: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
  const canvas = canvasRef.current!;
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  // CAMERA
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    12,
    BABYLON.Vector3.Zero(),
    scene
  );

  camera.attachControl(canvas, true);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.radius = 10;

  // LIGHT
  new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 1),
    scene
  );

  // MATERIAL HELPER
  const createMaterial = (scene: BABYLON.Scene) => {
    const mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = new BABYLON.Color3(0.2, 0.6, 1);
    return mat;
  };

  axios.get("http://localhost:8080/api/complex-shapes")
    .then((res) => {
      const data = res.data.find((x: any) => x.id === Number(id));

      if (!data || !data.shape1 || !data.shape2) {
        console.error("Missing shape data", data);
        return;
      }

      console.log("DATA:", data);

      // CREATE BASIC MESHES
      const createMesh = (shape: any, x: number) => {
        const size = shape.size || 2;
        let mesh;

        if (shape.shape === "Box") {
          mesh = BABYLON.MeshBuilder.CreateBox(shape.label, { size }, scene);
        } else if (shape.shape === "Sphere") {
          mesh = BABYLON.MeshBuilder.CreateSphere(shape.label, {
            diameter: size,
          }, scene);
        } else {
          mesh = BABYLON.MeshBuilder.CreateCylinder(shape.label, {
            height: size,
            diameter: size * 0.8,
          }, scene);
        }

        mesh.position.x = x;
        return mesh;
      };

      // STEP 1: CREATE MESHES
      const mesh1 = createMesh(data.shape1, -data.offset - 1);
      const mesh2 = createMesh(data.shape2, data.offset + 1);

      // STEP 2: APPLY SCALING (IMPORTANT FIX)
      const size1 = data.shape1.size || 2;
      const size2 = data.shape2.size || 2;

      mesh1.scaling = new BABYLON.Vector3(size1, size1, size1);
      mesh2.scaling = new BABYLON.Vector3(size2, size2, size2);

      // STEP 3: FORCE WORLD UPDATE
      mesh1.computeWorldMatrix(true);
      mesh2.computeWorldMatrix(true);

      // STEP 4: CSG
      const csg1 = BABYLON.CSG.FromMesh(mesh1);
      const csg2 = BABYLON.CSG.FromMesh(mesh2);

      let resultCSG;

      switch (data.operation) {
        case "ADD":
          resultCSG = csg1.union(csg2);
          break;
        case "SUBTRACT":
          resultCSG = csg1.subtract(csg2);
          break;
        case "INTERSECT":
          resultCSG = csg1.intersect(csg2);
          break;
        default:
          console.error("Unknown operation");
          return;
      }

      // STEP 5: CREATE RESULT MESH
      const resultMesh = resultCSG.toMesh("combined", null, scene);

      // STEP 6: MATERIAL + VISIBILITY (FIXED PLACE)
      const material = createMaterial(scene);
      resultMesh.material = material;

      resultMesh.isVisible = true;
      resultMesh.setEnabled(true);

      // STEP 7: DEBUG VISUAL HELP
      resultMesh.showBoundingBox = true;

      // STEP 8: CAMERA FIX (important for CSG visibility)
      camera.setTarget(BABYLON.Vector3.Zero());
      camera.radius = 10;

      // STEP 9: CLEAN UP OLD MESHES
      mesh1.dispose();
      mesh2.dispose();
    });

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  return () => {
    engine.dispose();
  };
}, [id]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    />
  );
  
}

export default ComplexBabylonViewer;