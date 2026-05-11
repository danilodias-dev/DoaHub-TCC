/* eslint-disable react/prop-types */
import { Heart, MapPin, Users } from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import { Link } from 'react-router-dom';

export function CampaignCard({ id, title, ongName, location, imageUrl, raisedAmount, goalAmount, donorsCount }) {
  const progressPercentage = Math.min(Math.round((raisedAmount / goalAmount) * 100), 100);

  return (
    <Link to={`/campanha/${id}`} className="block">
      <div className="bg-white rounded-[2rem] p-4 animate-lift flex flex-col gap-4 border border-graphite/5 cursor-pointer group w-full">
      <div className="relative h-48 rounded-[1.5rem] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <button className="glass w-10 h-10 rounded-full flex items-center justify-center text-graphite hover:text-emerald transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-2 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-display font-bold text-lg text-graphite-dark line-clamp-1">{title}</h3>
          <p className="text-sm text-graphite-light font-medium flex items-center gap-1.5 flex-wrap">
            <Link to={`/instituicao/1`} className="text-emerald hover:underline font-bold transition-all">{ongName}</Link>
            <span className="w-1 h-1 rounded-full bg-graphite/20"></span>
            <span className="flex items-center gap-0.5"><MapPin className="w-3.5 h-3.5" />{location}</span>
          </p>
        </div>

        <div className="bg-ice rounded-2xl p-4 flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-lg text-graphite-dark">
              R$ {raisedAmount.toLocaleString('pt-BR')}
            </span>
            <span className="text-sm font-medium text-graphite-light">
              meta R$ {goalAmount.toLocaleString('pt-BR')}
            </span>
          </div>
          
          <div className="w-full h-2 rounded-full bg-graphite/10 overflow-hidden">
            <div 
              className="h-full bg-emerald transition-all duration-slow ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-1">
            <span className="text-sm font-bold text-emerald">{progressPercentage}% alcançado</span>
            <span className="text-xs font-medium text-graphite-light flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {donorsCount} doaram
            </span>
          </div>
        </div>

        <PremiumButton className="w-full mt-2">
          Doar Agora
        </PremiumButton>
      </div>
      </div>
    </Link>
  );
}
