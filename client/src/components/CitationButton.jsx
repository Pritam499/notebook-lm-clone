import React from 'react';

export default function CitationButton({ page, onClick }) {
  return (
    <button
      className="text-purple-600 underline text-sm ml-2"
      onClick={() => onClick(page)}
    >
      [see page {page}]
    </button>
  );
}