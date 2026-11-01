/**
 * Screening Protocols and Calibration Constants
 */

export const SCREENING_CONSTANTS = {
  STANDARD_DISTANCE_CM: 40, // 40 cm for near vision
  DISTANCE_VISION_METERS: 3, // 3 meters for Tumbling E distance
  TUMBLING_E_DIRECTIONS: ['up', 'right', 'down', 'left'] as const,
  MINIMUM_CONTRAST_RATIO: 4.5,
  MAX_ALLOWED_REVIEWS_PER_TEST: 5,
  CLINICAL_DISCLAIMER_TEXT:
    'OptiGuide is a preliminary vision screening and eyewear guidance platform. It is not a diagnostic system and must not independently prescribe lens power. Qualified eye-care professionals must confirm prescriptions and clinical decisions.',
} as const;
