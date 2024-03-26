import {TextField, Typography} from "@mui/material";
import {PageFrame} from "../components/PageFrame";
import {TitleTypography} from "../components/styledElements";
import {useState} from "react";
import {IFixVisualizerJSON} from "../utilities/types";
import {JsonDetailsPanel} from "../components/JsonDetailsPanel.tsx";

function FixVisualizer() {

  const [json, setJson] = useState<IFixVisualizerJSON>()

  function parseJson(json: string) {
    setJson(JSON.parse(json))
  }

  return (
    <PageFrame>
      <TitleTypography>Fix Visualizer</TitleTypography>
      <Typography sx={{marginBottom: '1rem'}}>Copy the JSON output here to begin</Typography>
      <TextField
        sx={{width: '100%'}}
        label="JSON"
        multiline
        maxRows={5}
        onBlur={(event) => {
          parseJson(event.target.value)
        }}
      />
      {json ? <JsonDetailsPanel json={json}/> : null}
    </PageFrame>
  )
}


export default FixVisualizer