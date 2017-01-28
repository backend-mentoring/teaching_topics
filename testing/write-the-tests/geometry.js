const geometry = {
  isTriangle: (side1,side2,side3) => {
    return side1 + side2 > side3 ||
      side1 + side3 > side2 ||
      side2+ side3 > side1
  },

  isRightTriangle: (side1,side2,hypoteneuse) => {

    let squaresOfSides = (Math.pow(side1, 2) + Math.pow(side2, 2));
    let hypoteneuseSquared = Math.pow(hypoteneuse, 2);
    return geometry.isTriangle(side1,side2,hypoteneuse) && squaresOfSides === hypoteneuseSquared;
  }

};

console.log(geometry.isRightTriangle(3,4,5));



module.exports = geometry;
