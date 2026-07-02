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
      15,
      BABYLON.Vector3.Zero(),
      scene
    );

    camera.attachControl(canvas, true);
    camera.setTarget(BABYLON.Vector3.Zero());

    // LIGHT
    new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // MATERIALS (FIXED COLORS)
    const redMat = new BABYLON.StandardMaterial("red", scene);
    redMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    const greenMat = new BABYLON.StandardMaterial("green", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

    const blueMat = new BABYLON.StandardMaterial("blue", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0, 0, 1);

    // CREATE MESH FUNCTION
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

    axios.get("http://localhost:8080/api/complex-shapes")
      .then((res) => {
        const data = res.data.find((x: any) => x.id === Number(id));

        if (!data || !data.shape1 || !data.shape2) {
          console.error("Missing data", data);
          return;
        }

        console.log("DATA:", data);

        // -------------------------
        // STEP 1: CREATE ORIGINAL SHAPES
        // -------------------------
        const mesh1 = createMesh(data.shape1, -4);
        const mesh2 = createMesh(data.shape2, 4);

        mesh1.material = redMat;
        mesh2.material = greenMat;

        // -------------------------
        // STEP 2: APPLY SCALING BEFORE CSG
        // -------------------------
        const size1 = data.shape1.size || 2;
        const size2 = data.shape2.size || 2;

        mesh1.scaling = new BABYLON.Vector3(size1, size1, size1);
        mesh2.scaling = new BABYLON.Vector3(size2, size2, size2);

        mesh1.computeWorldMatrix(true);
        mesh2.computeWorldMatrix(true);

        // -------------------------
        // STEP 3: CSG OPERATION
        // -------------------------
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

        // -------------------------
        // STEP 4: RESULT MESH
        // -------------------------
        const resultMesh = resultCSG.toMesh("result", null, scene);
        resultMesh.material = blueMat;

        // -------------------------
        // STEP 5: POSITION FOR CLEAR VIEW
        // -------------------------
        mesh1.position.x = -10;
        mesh2.position.x = -4;
        resultMesh.position.x = 10;

        // -------------------------
        // STEP 6: VISIBILITY
        // -------------------------
        mesh1.isVisible = true;
        mesh2.isVisible = true;
        resultMesh.isVisible = true;

        resultMesh.showBoundingBox = true;

        // -------------------------
        // STEP 7: CAMERA FIX
        // -------------------------
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.radius = 12;
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
        display: "block",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    />
  );
}

export default ComplexBabylonViewer;