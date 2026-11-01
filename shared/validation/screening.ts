/**
 * Screening input validation helpers
 */

export function validateScreeningDistance(distanceCm: number): { isValid: boolean; message?: string } {
  if (distanceCm < 20 || distanceCm > 400) {
    return {
      isValid: false,
      message: `Calibration distance ${distanceCm}cm is outside the valid range (20cm - 400cm).`,
    };
  }
  return { isValid: true };
}
