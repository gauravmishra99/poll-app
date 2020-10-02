import { Card } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./Form.css";

const Options = forwardRef(({ progress, option, score }, ref) => {
  return (
    <div ref={ref}>
      <Card className="formpage__card">
        <p>{option}</p>
        <p>{score}</p>
        <div style={{ width: "90%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </Card>
    </div>
  );
});

export default Options;
