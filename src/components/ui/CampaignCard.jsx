/* eslint-disable react/prop-types */
import { Heart, MapPin, Users, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CampaignCard({ id, title, ongName, location, imageUrl, raisedAmount, goalAmount, donorsCount }) {
  const progressPercentage = Math.min(Math.round((raisedAmount / goalAmount) * 100), 100);

  return (
    <Link to={`/campanha/${id}`} className="block h-full">
      <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
        
        {/* Image Area */}
        <div className="relative w-full aspect-[4/3]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="bg-gray-50 flex flex-col items-center justify-center w-full h-full">
              <ImageIcon className="w-8 h-8 text-gray-300 mb-1" />
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Sem imagem</span>
            </div>
          )}
          <div className="absolute top-3 right-3 z-10">
            <button 
              className="bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm"
              onClick={(e) => e.preventDefault()} // Prevent navigation when clicking heart
              aria-label="Favoritar campanha"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-2">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 truncate flex items-center gap-1 mb-4">
            <span className="truncate font-medium">{ongName}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0"></span>
            <span className="flex items-center gap-1 truncate"><MapPin className="w-3.5 h-3.5 shrink-0" />{location}</span>
          </p>

          {/* Progress & Stats */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Arrecadado</span>
                <span className="text-sm font-medium text-gray-900">R$ {raisedAmount.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">Meta</span>
                <span className="text-sm font-medium text-gray-900">R$ {goalAmount.toLocaleString('pt-BR')}</span>
              </div>
            </div>
            
            <div 
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${progressPercentage}% da meta arrecadada`}
              className="w-full h-2 rounded-full bg-gray-100 overflow-hidden"
            >
              <div 
                className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-green-600">{progressPercentage}% alcançado</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {donorsCount} doaram
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto w-full py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 text-center">
            Doar Agora
          </div>
        </div>

      </div>
    </Link>
  );
}
