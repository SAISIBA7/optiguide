/**
 * Screening Report & Referral Types
 */

export interface ScreeningReportSummary {
  id: string;
  screeningId: string;
  userId: string;
  generatedAt: string;
  disclaimerAccepted: boolean;
  requiresProfessionalReferral: boolean;
  preliminaryObservations: string[];
  suggestedNextSteps: string[];
  eyewearRecommendations: {
    recommendedLensType?: 'single_vision' | 'progressive' | 'blue_light' | 'reading';
    frameFitSuggestions?: string[];
  };
}
