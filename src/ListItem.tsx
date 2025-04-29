import { Button, Stack, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface FieldProps {
  index: number;
  value: string;
  lastItem: boolean;
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  hasDuplicate?: boolean;  // New prop
}

export function ListItem(props: FieldProps) {
  const { index, value, lastItem, onChange, onAdd, onDelete, hasDuplicate } = props
  return (
    <Stack direction="row" spacing={1}>
      <Typography>{index + 1}.</Typography>
      <TextField
        size="small"
        error={hasDuplicate}
        helperText={hasDuplicate ? "Duplicate value" : ""}
        hiddenLabel
        variant="standard"
        defaultValue={value}
        onChange={(e) => {onChange(index, e.target.value)}}
        slotProps={{
          input: {
            endAdornment: index > 0 && (
              <IconButton
                size="small"
                onClick={() => onDelete(index)}
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                  padding: '2px',
                }}
              >
                <CloseIcon fontSize="small" color="error" />
              </IconButton>
            )
          }}
        }
        sx={{ 
          '&:hover .MuiIconButton-root': { opacity: 1 },
          width: '290px',
          '& .MuiInput-root': { width: '100%' }
        }}
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