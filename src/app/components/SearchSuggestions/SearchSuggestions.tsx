'use client';

import { useRouter } from 'next/navigation';
import styles from './SearchSuggestions.module.css';

interface SearchSuggestionsProps {
  suggestions: string[];
  className?: string;
}

const SearchSuggestions = ({ suggestions, className = '' }: SearchSuggestionsProps) => {
  const router = useRouter();

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className={`${styles.suggestionTags} ${className}`}>
      {suggestions.map((suggestion, index) => (
        <button 
          key={index}
          className={styles.suggestionTag}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions; 