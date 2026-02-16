import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCounter?: boolean;
}

export function Textarea({
  label,
  error,
  helperText,
  showCounter = false,
  maxLength,
  value,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        maxLength={maxLength}
        value={value}
        className={`
          w-full px-3 py-2 border rounded-lg text-sm resize-none
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-600
          ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
          ${className}
        `}
        {...props}
      />
      <div className="flex justify-between mt-1">
        <div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          {helperText && !error && <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
        </div>
        {showCounter && maxLength && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
