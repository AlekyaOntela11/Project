import axios from "axios";

const BASE = "http://localhost:8080/api/complex-shapes";

export const getComplexShapes = () => axios.get(BASE);
export const createComplexShape = async (data: any) => {
  return axios.post("http://localhost:8080/api/complex-shapes", {
    label: data.label,
    shape1Id: Number(data.shape1Id),
    shape2Id: Number(data.shape2Id),
    operation: data.operation,
    offset: Number(data.offset)
  });
}