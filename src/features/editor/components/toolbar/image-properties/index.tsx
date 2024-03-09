import PaddingOption from "./padding-option";
import RoundnessOption from "./roundness-option";
import ScaleOption from "./scale-option";

export default function ImagePropertiesOptions() {
  return (
    <>
      <ScaleOption />
      <PaddingOption />
      <RoundnessOption />
    </>
  );
}
