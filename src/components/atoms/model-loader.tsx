import { Html, useProgress } from "@react-three/drei";
import React from "react";

const ModelLoader:React.FC = () => {
    const { progress } = useProgress();
    return <Html center>🔨 {progress}%</Html>;
  }
  
export default ModelLoader