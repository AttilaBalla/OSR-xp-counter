import {TextField, Typography} from "@mui/material";
import {PageFrame} from "../components/PageFrame";
import {TitleTypography} from "../components/styledElements";
import {useState} from "react";
import {IFixVisualizerJSON} from "../utilities/types";
import {countFixes} from "../utilities/helpers";
import {FixListerPanel} from "../components/FixListerPanel";

function FixVisualizer() {

  const [json, setJson] = useState<IFixVisualizerJSON>()

  const fixes = countFixes(json?.fixes)
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
      {fixes ? <FixListerPanel fixes={fixes}/> : null}
    </PageFrame>
  )
}


export default FixVisualizer