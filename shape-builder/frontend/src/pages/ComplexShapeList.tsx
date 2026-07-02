import { useEffect, useState } from "react";
import { getComplexShapes } from "../api/complexShapeApi.ts";

function ComplexShapeList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getComplexShapes().then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Complex Shapes</h2>

      {data.map(item => (
        <div key={item.id}>
          <h3>{item.label}</h3>
          {/* <p>
            {item.shape1.label} {item.operation} {item.shape2.label}
          </p> */}
          <p>
  {item?.shape1?.label ?? "N/A"} {" "}
  {item?.operation} {" "}
  {item?.shape2?.label ?? "N/A"}
</p>
        </div>
      ))}
    </div>
  );
}

export default ComplexShapeList;

