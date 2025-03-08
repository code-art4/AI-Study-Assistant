
/**
 * Format a date to a string
 * @param date The date to format
 * @param format The format to use
 * @returns The formatted date string
 */
export const formatDate = (date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  if (!date) return '';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric',
    ...(format === 'long' ? { weekday: 'long' } : {})
  };
  
  return new Date(date).toLocaleDateString(undefined, options);
};

/**
 * Format a time to a string
 * @param date The date to format
 * @returns The formatted time string
 */
export const formatTime = (date: Date): string => {
  if (!date) return '';
  
  return new Date(date).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format a datetime to a string
 * @param date The date to format
 * @returns The formatted datetime string
 */
export const formatDateTime = (date: Date): string => {
  if (!date) return '';
  
  return `${formatDate(date, 'medium')} at ${formatTime(date)}`;
};

/**
 * Get the relative time from now
 * @param date The date to get the relative time from
 * @returns The relative time string
 */
export const getRelativeTime = (date: Date): string => {
  if (!date) return '';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
};

/**
 * Calculate the duration between two dates in minutes
 * @param startDate The start date
 * @param endDate The end date
 * @returns The duration in minutes
 */
export const getDurationInMinutes = (startDate: Date, endDate: Date): number => {
  if (!startDate || !endDate) return 0;
  
  return Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60));
};

/**
 * Format duration in minutes to a human-readable string
 * @param minutes The duration in minutes
 * @returns The formatted duration string
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
};

/**
 * Check if a date is today
 * @param date The date to check
 * @returns Whether the date is today
 */
export const isToday = (date: Date): boolean => {
  if (!date) return false;
  
  const today = new Date();
  const checkDate = new Date(date);
  
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is in the future
 * @param date The date to check
 * @returns Whether the date is in the future
 */
export const isFuture = (date: Date): boolean => {
  if (!date) return false;
  
  return new Date(date).getTime() > new Date().getTime();
};

/**
 * Get the number of days until a date
 * @param date The date to check
 * @returns The number of days until the date
 */
export const getDaysUntil = (date: Date): number => {
  if (!date) return 0;
  
  const now = new Date();
  const checkDate = new Date(date);
  
  // Reset hours to compare dates only
  now.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  
  return Math.floor((checkDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};
