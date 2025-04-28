import { Typography } from "@mui/material";
import { useState } from "react";
import { ListItem } from "./ListItem";

export default function App() {

  const [fields, setFields] = useState([{ value: '' }]);
  return (
    <>
      <Typography component='h1' variant='h6'>Prioritizing Grid</Typography>
      {
        fields.map(({ value }, index) => (
          <ListItem
            key={`item${index}`}
            index={index}
            value={value}
            lastItem={index === fields.length - 1}
            onChange={(i: number, v: string) => {
              const newFields = [...fields];
              newFields[i].value = v;
              setFields(newFields);
            }}
            onAdd={() => setFields([...fields, { value: '' }])}
          />
        ))
      }
    </>
  )
}
