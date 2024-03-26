export const formatTimeSeconds = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [hrs, mins, secs]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export const formatTimeMs = (ms: number) => {
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hours = Math.floor(min / 60);

  return `${hours}h ${min % 60}m ${sec % 60}s`;
};

export const roundMsToMinutes = (ms: number) => {
  return ms / 60000 < 1 ? 1 : Math.round(ms / 60000);
};

export const roundSecondsToHours = (seconds: number) => {
  return seconds / 3600 === 0
    ? 0
    : seconds / 3600 < 0.75
    ? 0.5
    : Math.round(seconds / 3600);
};
