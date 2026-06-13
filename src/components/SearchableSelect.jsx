import { useState, useMemo, useRef, useEffect } from 'react';

function SearchableSelect({ options, value, onChange, placeholder, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  const selectedOption = useMemo(() => 
    options.find(opt => opt.id === value), 
  [options, value]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(opt => 
      opt.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="searchable-select-container" ref={wrapperRef}>
      <label>{label}</label>
      <div 
        className={`searchable-select-display ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.properties.name : placeholder}
      </div>
      
      {isOpen && (
        <div className="searchable-select-dropdown">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <div className="options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <div 
                  key={opt.id} 
                  className={`option-item ${value === opt.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.id)}
                >
                  {opt.properties.name}
                </div>
              ))
            ) : (
              <div className="no-options">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
