/**
 * Preliminary Screening Types
 */

export type ScreeningTestType =
  | 'distance_vision'
  | 'near_vision'
  | 'astigmatism'
  | 'color_vision';

export type ScreeningStatus = 'pending' | 'in_progress' | 'completed' | 'abandoned';

export interface VisualAcuityScore {
  snellenFraction: string; // e.g. "20/20", "20/40"
  logMAR: number;          // e.g. 0.0, 0.3
  decimal: number;         // e.g. 1.0, 0.5
}

export interface ScreeningSession {
  id: string;
  userId: string;
  status: ScreeningStatus;
  startedAt: string;
  completedAt?: string;
  deviceCalibration: {
    screenResolution: string;
    distanceCm: number;
    brightnessLux?: number;
  };
  results: {
    leftEye?: VisualAcuityScore;
    rightEye?: VisualAcuityScore;
    binocular?: VisualAcuityScore;
    colorDeficiencyDetected?: boolean;
    astigmatismIndicator?: boolean;
  };
}
