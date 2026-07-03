import { useEffect, useState } from "react";
import { getComplexShapes } from "../api/complexShapeApi.ts";

function ComplexShapeList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getComplexShapes().then(res => setData(res.data));
  }, []);

  return (
    <div>

      <h2 style={{ marginLeft: "30px", marginRight: "24px"}}>Complex Shapes</h2>

      {data.map(item => (
        <div style={{ boxSizing: "border-box", marginLeft: "30px", marginRight: "24px",alignItems: "center",fontFamily: "Arial",fontSize: "16px"}} key={item.id}>
          <h3  style={{ boxSizing: "border-box", marginLeft: "30px", marginRight: "24px",alignItems: "center",fontFamily: "Arial",fontSize: "16px"}}>{item.label}</h3>
          <p  style={{ boxSizing: "border-box", marginLeft: "30px", marginRight: "24px",alignItems: "center",fontFamily: "Arial",fontSize: "16px"}}>
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

