import { Stack, Typography, IconButton, Snackbar } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";

export function Results({ fields }: { fields: { id: number; value: string; score?: number }[] }) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  
  const sortedFields = [...fields]
    .filter(f => f.value !== '')
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const handleCopy = async () => {
    const text = sortedFields
      .map((field, index) => `${index + 1}. ${field.value}`)
      .join('\n');
    
    await navigator.clipboard.writeText(text);
    setShowCopySuccess(true);
  };

  return (
    <Stack spacing={1} sx={{ maxWidth: '385px' }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Prioritized List
        </Typography>
        <IconButton 
          onClick={handleCopy}
          size="small"
          sx={{ mt: 2 }}
          title="Copy list"
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Stack>
      {
        sortedFields.map((field, index) => (
          <Stack 
            key={field.id} 
            direction="row" 
            spacing={2}
          >
            <Typography>{index + 1}.</Typography>
            <Typography>{field.value}</Typography>
          </Stack>
        ))
      }
      <Snackbar
        open={showCopySuccess}
        autoHideDuration={2000}
        onClose={() => setShowCopySuccess(false)}
        message="List copied to clipboard"
      />
    </Stack>
  );
}