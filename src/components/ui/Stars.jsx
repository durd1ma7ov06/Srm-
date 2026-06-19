import { Star } from 'lucide-react';

export default function Stars({ rating = 0, size = 16, interactive = false, onRate }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = value <= Math.round(rating);
        const star = (
          <Star
            size={size}
            className={filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
          />
        );

        if (!interactive) return <span key={value}>{star}</span>;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onRate?.(value)}
            className="transition-transform hover:scale-110 cursor-pointer"
            aria-label={`${value} yulduz`}
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
