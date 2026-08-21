import React, { useState } from 'react';
import CalificacionPromedio from './CalificacionPromedio';

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='100' height='150' viewBox='0 0 100 150'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%2394A3B8'>Sin Portada</text></svg>";

export default function LibroCard({ book, currentRole, onSelect }) {
  const { id, title, author, coverUrl, availableCount, averageRating, reviewsCount } = book;
  const [imgSrc, setImgSrc] = useState(coverUrl || PLACEHOLDER_IMAGE);

  const isAvailable = availableCount > 0;
  const canRequestLoan = currentRole === 'admin' || currentRole === 'reader';
  const showLoanAction = currentRole !== 'guest';

  return (
    <div 
      onClick={() => onSelect(id)}
      className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group h-full"
    >
      <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
        <img 
          src={imgSrc} 
          alt={title} 
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)} 
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200" 
          loading="lazy" 
        />
        <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm ${
          isAvailable ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {isAvailable ? `${availableCount} ${availableCount === 1 ? 'disponible' : 'disponibles'}` : 'No disponible'}
        </span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-slate-800 text-base line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-1 mb-3">{author}</p>
        
        <div className="mt-auto pt-3 border-t border-slate-100">
          <CalificacionPromedio rating={averageRating} reviewsCount={reviewsCount} />
        </div>
        
        {showLoanAction && (
          <div className="mt-3 pt-1">
            <button 
              disabled={!isAvailable || !canRequestLoan} 
              onClick={(e) => { 
                e.stopPropagation(); 
                alert(`Prestamo solicitado con exito para: ${title}`); 
              }} 
              className={`w-full py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
                isAvailable && canRequestLoan ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Solicitar préstamo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
