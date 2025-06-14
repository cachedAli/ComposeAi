import { DotLoader } from "react-spinners";

const Loader = ({
  color = "secondary",
}: {
  color?: "primary" | "secondary";
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <DotLoader
        color={color === "primary" ? "#06b6d4" : "#16f093"}
        size={40}
      />
    </div>
  );
};

export default Loader;
