import { colors, spacing, typography, borderRadius, elevation } from '../src/theme/tokens';

describe('Design Tokens', () => {
  it('should define primary and semantic colors', () => {
    expect(colors.primary[600]).toBe('#2563EB');
    expect(colors.accent[600]).toBe('#0D9488');
    expect(colors.status.success).toBe('#16A34A');
    expect(colors.status.error).toBe('#DC2626');
    expect(colors.status.warning).toBe('#D97706');
  });

  it('should define a 4px-grid spacing scale', () => {
    expect(spacing.none).toBe(0);
    expect(spacing.xs).toBe(4);
    expect(spacing.sm).toBe(8);
    expect(spacing.md).toBe(12);
    expect(spacing.base).toBe(16);
    expect(spacing.xl).toBe(24);
  });

  it('should define typography font sizes and weights', () => {
    expect(typography.fontSize.xs).toBe(12);
    expect(typography.fontSize.base).toBe(16);
    expect(typography.fontSize['3xl']).toBe(30);
    expect(typography.fontWeight.semibold).toBe('600');
  });

  it('should define border radii', () => {
    expect(borderRadius.sm).toBe(4);
    expect(borderRadius.md).toBe(8);
    expect(borderRadius.full).toBe(9999);
  });

  it('should define cross-platform elevation objects', () => {
    expect(elevation.low.elevation).toBe(2);
    expect(elevation.medium.elevation).toBe(4);
    expect(elevation.high.elevation).toBe(8);
  });
});
