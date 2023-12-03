import { GoeeyBallsOne } from "react-svg-spinners";

function LoadingSpinner() {
  return (
    <div role="status" className="flex items-center justify-center">
      <GoeeyBallsOne color="white" width={64} height={64} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
