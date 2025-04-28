import { Button, Stack, TextField, Typography } from "@mui/material";

interface FieldProps {
  index: number;
  value: string;
  lastItem: boolean;
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
}

export function ListItem({ index, value, lastItem, onChange, onAdd }: FieldProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography>{index + 1}.</Typography>
      <TextField
        size="small"
        hiddenLabel
        variant="standard"
        defaultValue={value}
        onChange={(e) => {onChange(index, e.target.value)}}
      />
      {lastItem && (
        <Button
          size="small"
          variant="contained"
          disabled={value === ''}
          onClick={() => onAdd()}
        >
          +
        </Button>
      )}
    </Stack>
  );
}