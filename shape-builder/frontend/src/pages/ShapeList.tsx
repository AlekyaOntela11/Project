import { useEffect, useState } from "react";
import { Shape } from "../types/Shape";
import { getShapes, deleteShape } from '../api/shapeApi.ts';
import { useNavigate } from "react-router-dom";

function ShapeList() {

  const [shapes, setShapes] = useState<Shape[]>([]);

  const navigate = useNavigate();

  const loadShapes = async () => {

    const response = await getShapes();

    setShapes(response.data);

  };

  useEffect(() => {

    loadShapes();

  }, []);

  const handleDelete = async (id: number) => {

    if (window.confirm("Delete this shape?")) {

      await deleteShape(id);

      loadShapes();

    }

  };

  return (

    <div style={{ padding: 30 }}>

      <h1>Shapes</h1>

      <button
        onClick={() => navigate("/new")}
      >
        New Shape
      </button>

      <br />
      <br />

      <table
        border={1}
        cellPadding={10}
        style={{
          borderCollapse: "collapse",
          width: "100%"
        }}
      >

        <thead>

          <tr>

            <th>Label</th>

            <th>Shape</th>

            <th>Color</th>

            <th>Size</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {shapes.map((shape) => (

            <tr key={shape.id}>

              <td>{shape.label}</td>

              <td>{shape.shape}</td>

              <td>{shape.color}</td>

              <td>{shape.size}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/edit/${shape.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(shape.id!)
                  }
                  style={{
                    marginLeft: 10
                  }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ShapeList;