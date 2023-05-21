export function lineClamp(line: number) {
  return {
    display: "-webkit-box",
    WebkitLineClamp: line,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
}
