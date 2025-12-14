import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import DotGrid from "./DotGrid";

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DotGrid
          dotSize={6}
          gap={15}
          baseColor="#292136"
          activeColor="#5227FF"
          proximity={170}
          shockRadius={250}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
