import { useState } from 'react';

interface Field {
  id: number;
  value: string;
  score?: number;
}

export function usePairComparison(initialFields: Field[]) {
  const [currentFields, setCurrentFields] = useState<Field[]>(initialFields);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [isTieBreaking, setIsTieBreaking] = useState(false);
  const [tieBreakPairs, setTieBreakPairs] = useState<[Field, Field][]>([]);

  const generatePairs = (items: Field[]) => {
    const pairs: [Field, Field][] = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        pairs.push([items[i], items[j]]);
      }
    }
    return pairs;
  };

  const pairs = generatePairs(currentFields.filter(f => f.value !== ''));
  const currentPair = isTieBreaking ? tieBreakPairs[currentPairIndex] : pairs[currentPairIndex];

  return {
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
  };
}