export default function formatTimeDifference(timestamp: Date) {
  const now = new Date();
  const createdAt = new Date(timestamp);

  const timeDifference = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} secs`;
  } else if (minutes < 60) {
    return `${minutes} mins`;
  } else if (hours < 24) {
    return `${hours} hrs`;
  } else if (days < 30) {
    return `${days} days`;
  } else if (months < 12) {
    return `${months} months`;
  } else {
    return `${years} years`;
  }
}
