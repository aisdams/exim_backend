export function calculateExpirationInSeconds(expireDate: Date): number {
  const currentDate = new Date();
  const timeDifference = expireDate.getTime() - currentDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  return secondsDifference;
}
