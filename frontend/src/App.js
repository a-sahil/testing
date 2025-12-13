import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import DotGrid from './DotGrid'; // <--- Import the component

function App() {
  return (
    // Make the main container relative so we can position the background absolutely
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* 1. The DotGrid Background */}
      {/* We use absolute positioning and -z-10 to push it behind everything */}
      <div className="absolute inset-0 -z-10">
        <DotGrid
          dotSize={2}           // Smaller dots look better for backgrounds
          gap={20}              // Spacing between dots
          baseColor="#e5e7eb"   // Light gray (Tailwind gray-200)
          activeColor="#5227FF" // Purple on interaction
          proximity={100}
          shockRadius={200}
        />
      </div>

      {/* 2. Your Existing Application Logic */}
      <div className="relative z-10 h-full flex flex-col">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>

    </div>
  );
}

export default App;