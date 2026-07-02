import { useEffect, useState } from "react";
import { Shape } from "../types/Shape";
import { createShape, updateShape, getShape } from "../api/shapeApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import BabylonViewer from "../components/BabylonViewer.tsx";

function ShapeForm() {

  const [shape, setShape] = useState<Shape>({
    label: "",
    shape: "Box",
    color: "Red",
    size: 1
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  // Load shape if editing
  useEffect(() => {

    const loadShape = async () => {

      if (isEdit && id) {

        const res = await getShape(Number(id));

        setShape(res.data);

      }

    };

    loadShape();

  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setShape({
      ...shape,
      [e.target.name]:
        e.target.name === "size"
          ? Number(e.target.value)
          : e.target.value
    });

  };

  const handleSubmit = async () => {

  if (!shape.label.trim()) {
    alert("Label is required");
    return;
  }

  if (shape.size < 1 || shape.size > 5) {
    alert("Size must be between 1 and 5");
    return;
  }

  if (isEdit && id) {

    await updateShape(Number(id), shape);
    alert("Shape updated!");

  } else {

    await createShape(shape);
    alert("Shape created!");

  }

  navigate("/");

};

  return (

    <div style={{ padding: 30 }}>

      <h1>{isEdit ? "Edit Shape" : "Create Shape"}</h1>

      {/* LABEL */}
      <div>
        <label>Label</label>
        <br />
        <input
          name="label"
          value={shape.label}
          onChange={handleChange}
        />
      </div>

      <br />

      {/* SHAPE */}
      <div>
        <label>Shape</label>
        <br />
        <select
          name="shape"
          value={shape.shape}
          onChange={handleChange}
        >
          <option value="Box">Box</option>
          <option value="Sphere">Sphere</option>
          <option value="Cylinder">Cylinder</option>
          <option value="Cone">Cone</option>
          <option value="Torus">Torus</option>
          <option value="Disc">Disc</option>
          
        </select>
      </div>

      <br />

      {/* COLOR */}
      <div>
        <label>Color</label>
        <br />
        <select
          name="color"
          value={shape.color}
          onChange={handleChange}
        >
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Pink">Pink</option>
        </select>
      </div>

      <br />

      {/* SIZE */}
      <div>
        <label>Size (1–5)</label>
        <br />
        <input
          type="number"
          name="size"
          min={1}
          max={5}
          value={shape.size}
          onChange={handleChange}
        />
      </div>

      <br />

      {/* SAVE */}
      <button onClick={handleSubmit}>
        {isEdit ? "Update Shape" : "Create Shape"}
      </button>

<BabylonViewer shape={shape} />
    </div>

  );

}

export default ShapeForm;