import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ListItem } from "./ListItem";
import { Results } from "./Results";
import { PrioritizeDialog } from "./PrioritizeDialog";

interface Field {
  id: number;
  value: string;
  score?: number;
}

export default function App() {
  const [fields, setFields] = 
    useState<Field[]>([{ id: Date.now(), value: '', score: 0 }]);
  const [open, setOpen] = useState(false);
  const [isComparisonComplete, setIsComparisonComplete] = useState(false);

  const handleComparisonComplete = (updatedFields: Field[]) => {
    setFields(updatedFields);
    setIsComparisonComplete(true);
  };

  const handleClickOpen = () => {
    setIsComparisonComplete(false);
    setOpen(true);
  };

  return (
    <Stack spacing={2} sx={{ padding: '20px', margin: '10px' }}>
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
              setIsComparisonComplete(false);
            }}
            onAdd={() => setFields([...fields, { id: Date.now(), value: '' }])}
            onDelete={(i) => {
              const newFields = fields
                .filter((_, index) => index !== i)
                .map(field => ({ ...field, score: 0 }));
              setFields(newFields);
              setIsComparisonComplete(false);
            }}
          />
        ))
      }
      <Button 
        variant="contained" 
        disabled={fields.length < 3 || fields.some(f => f.value === '')}
        sx={{ marginBottom: '10px', maxWidth: '385px' }}
        onClick={handleClickOpen}
      >
        Prioritize
      </Button>

      {isComparisonComplete && (<Results fields={fields} />)}

      <PrioritizeDialog 
        open={open}
        setOpen={setOpen}
        fields={fields}
        onComparisonComplete={handleComparisonComplete}
      />
    </Stack>
  );
}
