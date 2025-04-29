import { Typography } from "@mui/material";
import { useState } from "react";
import { ListItem } from "./ListItem";

export default function App() {

  const [fields, setFields] = useState([{ id: Date.now(), value: '' }]);
    return (
    <>
      <Typography component='h1' variant='h6'>Prioritizing Grid</Typography>
      {
        fields.map(({ id, value }, index) => (
          <ListItem
            key={id}
            index={index}
            value={value}
            lastItem={index === fields.length - 1}
            onChange={(i: number, v: string) => {
              const newFields = [...fields];
              newFields[i].value = v;
              setFields(newFields);
            }}
            onAdd={() => setFields([...fields, { id: Date.now(), value: '' }])}
            onDelete={(i) => setFields(fields.filter((_, index) => index !== i))}
          />
        ))
      }
    </>
  )
}
