import { useEffect, useState } from "react";
import axios from "axios";
import { createComplexShape } from "../api/complexShapeApi.ts";
import ComplexBabylonViewer from "../components/ComplexBabylonViewer.tsx";

function ComplexShapeForm() {
  const [shapes, setShapes] = useState<any[]>([]);
  const [createdId, setCreatedId] = useState<number | null>(null);

  const [form, setForm] = useState({
    label: "",
    shape1Id: 0,
    shape2Id: 0,
    operation: "ADD",
    offset: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/shapes")
      .then(res => setShapes(res.data));
  }, []);

  const submit = async () => {
    if (!form.shape1Id || !form.shape2Id) {
      alert("Please select both shapes");
      return;
    }

    const res = await createComplexShape({
      label: form.label,
      shape1Id: Number(form.shape1Id),
      shape2Id: Number(form.shape2Id),
      operation: form.operation,
      offset: Number(form.offset),
    });

    setCreatedId(res.data.id);

    alert("Created!");
  };

  return (
    <div>
      <h2>Create Complex Shape</h2>

      <input
        placeholder="Label"
        onChange={e => setForm({ ...form, label: e.target.value })}
      />

      <select
        value={form.shape1Id}
        onChange={e =>
          setForm({ ...form, shape1Id: Number(e.target.value) })
        }
      >
        <option value="">Select Shape 1</option>
        {shapes.map(s => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>

      <select
        value={form.shape2Id}
        onChange={e =>
          setForm({ ...form, shape2Id: Number(e.target.value) })
        }
      >
        <option value="">Select Shape 2</option>
        {shapes.map(s => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>

      <select
        onChange={e =>
          setForm({ ...form, operation: e.target.value })
        }
      >
        <option value="ADD">Add</option>
        <option value="SUBTRACT">Subtract</option>
        <option value="INTERSECT">Intersect</option>
      </select>

      <input
        type="number"
        min={0}
        max={5}
        onChange={e =>
          setForm({ ...form, offset: Number(e.target.value) })
        }
      />

      <button onClick={submit}>Create</button>

      {createdId && (
        <ComplexBabylonViewer id={createdId} />
      )}
    </div>
  );
}

export default ComplexShapeForm;