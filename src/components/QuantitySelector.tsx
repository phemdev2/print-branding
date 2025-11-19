import React from 'react';

export default function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(Math.max(1, value - 1))} className="px-2 py-1 border rounded">-</button>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Math.max(1, Number(e.target.value)))}
        className="w-20 p-1 border rounded text-center"
      />
      <button onClick={() => onChange(value + 1)} className="px-2 py-1 border rounded">+</button>
    </div>
  );
}
