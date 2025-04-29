import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useEffect } from "react";
import { usePairComparison } from "./hooks/usePairComparison";

interface Field {
  id: number;
  value: string;
  score?: number;
}

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fields: Field[];
  onComparisonComplete: (fields: Field[]) => void;
}

export function PrioritizeDialog({ open, setOpen, fields, onComparisonComplete }: DialogProps) {
  const {
    currentFields,
    setCurrentFields,
    currentPair,
    currentPairIndex,
    setCurrentPairIndex,
    isTieBreaking,
    setIsTieBreaking,
    tieBreakPairs,
    setTieBreakPairs,
    pairs
  } = usePairComparison(fields);

  useEffect(() => {
    if (open) {
      setCurrentFields(fields.map(field => ({ ...field, score: 0 })));
      setCurrentPairIndex(0);
      setIsTieBreaking(false);
      setTieBreakPairs([]);
    }
  }, [open, fields, setCurrentFields, setCurrentPairIndex, setIsTieBreaking, setTieBreakPairs]);

  const handleChoice = (chosenIndex: 0 | 1) => {
    const chosenField = currentPair[chosenIndex];

    setCurrentFields(prevFields => 
      prevFields.map(f => f.id === chosenField.id ? { ...f, score: (f.score || 0) + 1 } : f)
    );

    const isLastPair = 
      currentPairIndex === (isTieBreaking ? tieBreakPairs.length - 1 : pairs.length - 1);
    
    if (!isLastPair) {
      setCurrentPairIndex(prev => prev + 1);
      return;
    }
    const findTies = (fields: Field[]) => {
      const ties: [Field, Field][] = [];
      for (let i = 0; i < fields.length; i++) {
        for (let j = i + 1; j < fields.length; j++) {
          if (fields[i].score === fields[j].score) {
            ties.push([fields[i], fields[j]]);
          }
        }
      }
      return ties;
    };
    const newTies = findTies(currentFields);
    if (newTies.length === 0) {
      setOpen(false);
      onComparisonComplete(currentFields);
    } else {
      setTieBreakPairs(newTies);
      setCurrentPairIndex(0);
      setIsTieBreaking(true);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {isTieBreaking ? "Break the tie" : "Which is more important?"}
      </DialogTitle>
      <DialogContent sx={{ minWidth: '300px' }}>
        {currentPair && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            {[0, 1].map(index => (
              <Button 
                key={index}
                variant="outlined" 
                onClick={() => handleChoice(index as 0 | 1)}
              >
                {currentPair[index].value}
              </Button>
            ))}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}