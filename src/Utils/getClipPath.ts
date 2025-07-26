export type ScreenSpaceCoordinate = [x: number, y: number, innerCorner: 0 | 1];
type Vector2D = [x: number, y: number];

function getDirection(vector1: Vector2D, vector2: Vector2D): Vector2D {
  return [vector1[0] - vector2[0], vector1[1] - vector2[1]];
}

function calculateUnitVector([x, y]: Vector2D): Vector2D {
  const magnitude = Math.hypot(x, y);
  return [x / magnitude, y / magnitude];
}

function interpolateLinear(
  startValue: number,
  endValue: number,
  interpolationFactor: number,
): number {
  return startValue + (endValue - startValue) * interpolationFactor;
}

// Compute a concave radius multiplier based on angle sharpness
function getConcaveRadiusMultiplier(
  fromVector: Vector2D,
  toVector: Vector2D,
  maxScale = 3,
): [number, number] {
  const vectorDotProduct: number =
    fromVector[0] * toVector[0] + fromVector[1] * toVector[1];

  const vectorCrossProduct =
    fromVector[0] * toVector[1] - fromVector[1] * toVector[0];

  const signedAngleBetweenVectors = Math.atan2(
    vectorCrossProduct,
    vectorDotProduct,
  ); // Signed angle in radians

  /*
   * returns a number between 0 to 1
   * 0 at 90°
   * 1 at 0°
   */
  const angleSharpnessNormalized: number =
    (Math.PI / 2 - Math.abs(signedAngleBetweenVectors)) / (Math.PI / 2);

  const scaleMultiplier = interpolateLinear(
    1,
    maxScale,
    angleSharpnessNormalized,
  ); // 1 to maxScale

  const sweepFlag = Math.sign(signedAngleBetweenVectors) > 0 ? 1 : 0;

  return [scaleMultiplier, sweepFlag];
}

export default function getClipPath({
  containerWidth,
  containerHeight,
  coordinates,
  arcRadius = 8,
}: {
  containerWidth: number;
  containerHeight: number;
  coordinates: ScreenSpaceCoordinate[];
  arcRadius: number;
}): string {
  const coordinateNodes: Vector2D[] = coordinates.map(([x, y]) => [
    x * containerWidth,
    y * containerHeight,
  ]);

  let pathData = "";
  const totalNodes = coordinateNodes.length;

  for (let i = 0; i < totalNodes; i++) {
    const previousNode = coordinateNodes[(i - 1 + totalNodes) % totalNodes];
    const currentNode = coordinateNodes[i];
    const nextNode = coordinateNodes[(i + 1) % totalNodes];

    // Skip if any of the nodes are missing
    if (!previousNode || !currentNode || !nextNode) continue;

    const fromVector = calculateUnitVector(
      getDirection(currentNode, previousNode),
    );
    const toVector = calculateUnitVector(getDirection(nextNode, currentNode));

    const startX = currentNode[0] - fromVector[0] * arcRadius;
    const startY = currentNode[1] - fromVector[1] * arcRadius;
    const endX = currentNode[0] + toVector[0] * arcRadius;
    const endY = currentNode[1] + toVector[1] * arcRadius;

    if (i === 0) {
      pathData += `M ${startX.toFixed(2)} ${startY.toFixed(2)}`;
    } else {
      pathData += ` L ${startX.toFixed(2)} ${startY.toFixed(2)}`;
    }

    const isInnerNode = coordinates[i]?.[2] === 1;
    if (isInnerNode) {
      const [scale, sweepFlag] = getConcaveRadiusMultiplier(
        fromVector,
        toVector,
        3.5,
      ); // maxScale can be tuned
      const dynamicRadius = arcRadius * scale;

      pathData += ` A ${dynamicRadius} ${dynamicRadius} 0 0 ${sweepFlag} ${endX.toFixed(2)} ${endY.toFixed(2)}`;
    } else {
      pathData += ` A ${arcRadius} ${arcRadius} 0 0 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;
    }
  }

  pathData += " Z";

  return pathData;
}
