export function validateShape(data: any) {

    const allowedShapes = [
        "Box",
        "Sphere",
        "Cylinder",
        "Triangle",
        "Cone",
        "Torus",
        "Disc"
    ];

    const allowedColors = [
        "Red",
        "Green",
        "Blue",
        "Pink"
    ];

    if (!data.label || data.label.trim() === "") {

        return "Label is required";

    }

    if (!allowedShapes.includes(data.shape)) {

        return "Shape must be Box, Sphere or Cylinder";

    }

    if (!allowedColors.includes(data.color)) {

        return "Color must be Red, Green or Blue";

    }

    if (data.size < 1 || data.size > 5) {

        return "Size must be between 1 and 5";

    }

    return null;

}