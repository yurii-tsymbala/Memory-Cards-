export function getGridCellSize(
  columnsCount: number,
  rowsCount: number
): string {
  const sizeX = `${80 / columnsCount}vw`;
  const sizeY = `${80 / rowsCount}vh`;

  const widthFactor = (0.8 * window.innerWidth) / columnsCount;
  const heightFactor = (0.8 * window.innerHeight) / rowsCount;
  const maxCardSize = 160;

  if (Math.min(widthFactor, heightFactor) > maxCardSize) {
    return `${maxCardSize}px`;
  } else {
    return widthFactor < heightFactor ? sizeX : sizeY;
  }
}
