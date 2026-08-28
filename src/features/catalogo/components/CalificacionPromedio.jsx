import React from 'react';

export default function CalificacionPromedio({ rating, reviewsCount }) {
  if (reviewsCount === 0 || rating == null) {
    return <span className="text-xs italic text-slate-400">Sin reseñas</span>;
  }

  return (
    <div className="flex items-center gap-1.5 text-sm text-slate-600">
      <span className="text-amber-500 font-bold">*</span>
      {}
      <span className="font-semibold text-slate-700">{rating.toFixed(1)}</span>
      <span className="text-xs text-slate-400">({reviewsCount})</span>
    </div>
  );
}
